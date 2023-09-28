/*

mysql and sqlite modules use asynchronous callbacks
this is difficult to write and can lead to unclear code, and can lead to callback hell
The modules do not support promises to be used with async/await so here is a wrapper to make that possible

*/

class dummydb
{
  constructor(){ }
    
  /* passing any params triggers an error, just for the purposes of the demo */
  all(sql, params, callback){

    //query db
    let result = [];

    try{
        if (params){
            throw "forced error";
            //throw new Error('my own error');
        }

        result = [1,2,3]; //imagined data returned on success
    }
    catch(error){
        callback(error, null);
        return;
    }

    callback(null, result);

  }


}

let db = new dummydb;


/* 
    Sending reject when there is an error will produce an error unless the catch method is used in-line

    await queryPromise1("test").catch(e => e);    

*/
db.queryPromise1 = function (sql, params) {

    return new Promise( (resolve, reject) => {

        this.all(sql, params, function (error, data) {
            if (error){ reject([null, error]);  }
            resolve([data, null]);
        });
        
    });

};





/*
    This function returns a standard promise that is then designed to be wrapped
    
*/
db.queryPromise2 = function (sql, params) {

    return new Promise( (resolve, reject) => {

        this.all(sql, params, function (error, data) {
            if (error){ reject(error);  }
            resolve(data);
        });
        
    });

};




db.wrappedPromise = async (sql, params) => {
    
    try{
        const data = await db.queryPromise2(sql, params);
        return [data, null];
    }catch(error){
        console.log("wrapper error");
        return [null, error]
    }

};



/* 
    This wrapper means the promise will always produce a deconstructable [data, error] output without needing to use catch in-line 
    const [data, error] = await promiseWrapper( db.tryCatchWrapper("test3" ) );
    
*/
async function promiseWrapper(promise){
    try{
        const data = await promise;
        return [data, null];
    }catch(error){
        console.log("wrapper error");
        return [null, error]
    }

}

/* test non wrapped method */
async function myfunc(){
    console.log("Running myfunc");

    const [data, error] = await db.queryPromise1("test1" ).catch(e => e);

    if (error){
        console.log("func there was an error: ", error);
        return;
    }

    console.log("myfunc data:", data);

}

/* test wrapped method */
async function myfunc2(){
    console.log("Running myfunc2");

    //const [error, data] = await promiseWrapper( function(){ db.asyncquery("test3" ) } );
    const [data, error] = await promiseWrapper( db.queryPromise2("test2" ) );
    if (error){
        console.log("myfunc2 there was an error: ", error);
        return;
    }

    console.log("myfunc2 data:", data);
}


/* Wrapped promise in db class */
async function myfunc3(){
    console.log("Running myfunc3");

    //const [error, data] = await promiseWrapper( function(){ db.asyncquery("test3" ) } );
    const [data, error] = await db.wrappedPromise("test3" );

    if (error){
        console.log("myfunc3 there was an error: ", error);
        return;
    }

    console.log("myfunc3 data:", data);
}





console.log("-------------------------- Marker 1 --------------------------");
/* test callback method */
db.all("test1", null, function(error, data){
    console.log("Running test1 callback");
    if (error){ console.log("an error was logged")}
    else{
        console.log("test1 data:", data);
    }
});

console.log("-------------------------- Marker 2 --------------------------");
/* test non-wrapped promise method */
myfunc();
console.log("-------------------------- Marker 3 --------------------------");
/* test wrapped promise method */
myfunc2();
console.log("-------------------------- Marker 4 --------------------------");
/* test wrapped promise method in class*/
myfunc3();
console.log("-------------------------- Marker 5 --------------------------");
