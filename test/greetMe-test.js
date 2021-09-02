// const assert = require('assert');
// const greet = require('../greetMe');

// describe("This instance is testing greet function", function(){
//     it('should be able to set and get the entered name Yolie' , function(){

//         const greetMe = greet();

//         greetMe.greetEnteredName('yolie');    
//         assert.equal('Yolie', greetMe.greetEnteredName());
        
//     });
//     // it('should greet Amanda in isiXhosa, the selected language and increment the counter' , function(){

//     //     const greetMe = greet();
//     //     let name = 'Amanda' 

//     //     greetMe.setName('Molo,' + name)     
//     //     assert.equal('Molo, Amanda', greetMe.getName());
        
//     // });

//     it('should greet Xolie with a selected language which is Afrikaans and increment the counter' , function(){

//         const greetMe = greet();
//         let name = 'Xolie' 

//         greetMe.greetEnteredName(name)     
//         assert.equal(1, greetMe.greetEnteredName());
        
//     });

//     it('should show that counter does not increment if a person is greeted more than one time' , function(){

//         const greetMe = greet()
//         greetMe.greetEnteredName('lol')
//         greetMe.greetEnteredName('LOL')
//         greetMe.greetEnteredName('Lol')

//         assert.equal(1, greetMe.greetCounter())
   
//     });


//     it('should increment the counter if three different users are greeted' , function(){

//         const greetMe = greet()
//         greetMe.setName('Mishy')
//         greetMe.setName('lina')
//         greetMe.setName('buhle')

//         assert.equal(3, greetMe.greetCounter())
        
//     });

//     it('should increment the counter if three different names are greeted and should continue with the local storage counter on page reload. Before the page loads 3 people were greeted and 3 more are greeted after the page/browser reload and now there are 6 greeted people' , function(){

//         const greetMe = greet()
//         greetMe.greetEnteredName('busie')
//         greetMe.greetEnteredName('Nandy')
//         greetMe.greetEnteredName('Nzwakie')

//         assert.equal(3, greetMe.greetCounter())

//         greetMe.greetEnteredName('Sasa')
//         greetMe.greetEnteredName('Pinky')
//         greetMe.greetEnteredName('Lelo')

//         assert.equal(6, greetMe.greetCounter())
        
//     });

//     it('should display error messages saysing "please enter a name and select a language if no name entered and no language selected"' , function(){

//         const greetMe = greet()
//         let userName = ''

//         greetMe.setName(userName);
        
//         assert.equal('', greetMe.getName())        
//     });

//      it('should not allow a user to enter a letiable type if its not a string and not letters(A-Za-z)' , function(){

//         const greetMe = greet();
//         let pattern1 = /^((CA|CK|CL)\s([0-9]){6})$/ ;
//         let pattern3 = /^((CA|CK|CL)\s\d{3}\-\d{3})$/;
//         let pattern2 =  /^((CA|CK|CL)\s\d{3}\s\d{3})$/;
//         greetMe.greetEnteredName('')

//         assert.equal('', greetMe.greetEnteredName())
   
//     });   

//     it('should display error messages saying *please enter your name* if a user selected a language and clicked greet button without entering a name' , function(){

//         const greetMe = greet()
//         let noName = "*please enter your name*"

//         greetMe.getName('');
        
//         assert.equal(noName, greetMe.validateEmptyForm())        
//     });

//     // it('should display error messages saying *please enter your name* if a user selected a language and clicked greet button without entering a name' , function(){

//     //     const greetMe = greet()
//     //     let noSelection = "*please enter your name and select a language*"

//     //     greetMe.greetEnteredName('');
        
//     //     assert.equal(noSelection, greetMe.validateNoLangAndName())        
//     // });

// })

const assert = require('assert');
const greetPeeps = require('../greetMe');
const pg = require("pg");
let salute = greetPeeps(pool);

const Pool = pg.Pool;

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_app';

const pool = new Pool({
  //connection to the address
    connectionString,
    ssl : {
      rejectUnauthorized: false
    }
  });

  describe("The greet_app", function(){
    beforeEach(async function () {
        await pool.query("delete from greetUsers");
    });
    
    describe("The greetEnteredName function", function () {
        it("should be able to insert a name Amanda and increment the counter", async function () {
            //connect to the factory function
            let salute = greet(pool);
             await salute.greetEnteredName("Amanda")
             
            
            assert.deepEqual([{name: "Amanda"}], await salute.getName());
    
        });
    });
    
        describe("The greetEnteredName function", function() {
    
       
        it("Should be able to greet in Isixhosa", async function () {
            let salute = greet(pool);
             await salute.greetEnteredName('Xhosa', 'Mandy');
    
           
            assert.equal('Molo, Mandy', await salute.greetEnteredName('Xhosa', 'Mandy'));
    
        });
        it("Should be able to greet in English", async function () {
            let salute = greet(pool);
            
             await salute.greetEnteredName('English', 'Boys');
             
    
           
            assert.equal('Hellow, Boys', await salute.greetEnteredName('English', 'Boys'));
    
        });
    
        it("Should be able to greet in Afrikaans", async function () {
            let salute = greet(pool);
            
             await salute.greetEnteredName('Hallo', 'Nandy');
             
           
            assert.equal('Hallo, Nandy', await salute.greetEnteredName('Afrikaans', 'Nandy'));
    
        });
    });
    
        describe("The greetCounter function", function() {
        it("Should be able to count 2 names entered", async function () {
            let salute = greet(pool);
            
            await salute.greetEnteredName('Yolie');
            await salute.greetEnteredName('Bulie');
    
        assert.equal(2, await salute.greetCounter());
        });
    
            it("Should be able to count 4 names entered and increment the counter", async function () {
                let salute = greet(pool);
            
                await salute.greetEnteredName('amanda');
                await salute.greetEnteredName('lina');
                await salute.greetEnteredName('mnashe');
                await salute.greetEnteredName('Izie');
    
        
            assert.equal(4, await salute.greetCounter());
            });
        
    });
    
    describe("The name greeted function", function() {
        it("should be able to return all the greetEnteredName names as an object", async function() {
            let salute = greet(pool);
            
            await salute.greetEnteredName('Sibo');
            await salute.greetEnteredName('Sinazo');
            await salute.greetEnteredName('Mzi');
            await salute.greetEnteredName('Bonolo');
            assert.deepEqual([{name: 'Sibo'}, {name: 'Sinazo'}, {name: 'Mzi'}, {name: 'Bonolo'}], await salute.getName());
    
        });
    });
    
    describe("The namegreetEnteredName function", function() {
        it("should be able to add a name and conter in a sentence", async function() {
            let salute = greet(pool);
            
            await salute.greetEnteredName('Anam');
            
            assert.equal('Hello, ' + 'Anam' + ' has been greetEnteredName ' + 1 + ' times!', await salute.getName('Anam'));
        });
    });
    after(function() {
        pool.end();
    });
    
    });
    
