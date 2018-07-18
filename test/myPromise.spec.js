import Promise from '../src/myPromise.js'


describe('Promise.then() unit test', () => {
  
    it('the first unit test',() => {

	  	let myFirstPromise = new Promise((resolve,reject) => {
	  		setTimeout( ()=>{
	  			resolve("成功")
	  		},250)
	  	})

	  	myFirstPromise.then((successMessage)=> {
	  		expect( successMessage ).toBe("成功");
	  	})
    })
    describe('Promise.then() unit test one',() => {
	    it('first',() => {
		  	let p1 = new Promise(function(resolve, reject) {
			  resolve("Success!");
			});

			p1.then(function(value) {

			  expect( value ).toBe("Success!");	

			}, function(reason) {
			});

			let p2 = new Promise(function(resolve, reject) {
			  reject("fail!");
			});

			p2.then(function(value) {
			  console.log(value); // Success!
			}, function(reason) {
			  expect( reason ).toBe("fail!");	
			});

	    })
    })
	describe('Promise.then() unit test two',() => {

	  	let result_arr = [];

	  	beforeEach(function(done) {
	  		Promise.resolve("foo")
			  .then(function(string) {
			    return new Promise(function(resolve, reject) {
			      setTimeout(function() {
			        string += 'bar';
			        resolve(string);
			      }, 1);
			    });
			  })
			  .then(function(string) {
			    setTimeout(function() {
			      string += 'baz';
			      expect(string).toBe('foobarbaz');
			      result_arr.push(string)
			      done()
			    }, 1)
			    return string;
			  })
			  .then(function(string) {
			  	expect(string).toBe('foobar');
			    result_arr.push(string)
			});
	    });

	  	it("first", function() {
	  		var result_arr_test = ['foobar','foobarbaz']
	        expect(result_arr).toEqual(result_arr_test);
	    });
	})


	describe('Promise.then() unit test three',() => {

	  	let result_arr = [];

	  	beforeEach(function(done) {
	  		var p2 = new Promise(function(resolve, reject) {
			  resolve(1);
			});

			p2.then(function(value) {
				result_arr.push(value)
			  return value + 1;
			}).then(function(value) {
			  result_arr.push(value) // 2- This synchronous usage is virtually pointless
			  done()
			});

			p2.then(function(value) {
			 result_arr.push(value) // 1
			});
	    });

	  	it("first", function() {
	  		var result_arr_test = [1,1,2]
	        expect(result_arr).toEqual(result_arr_test);
	    });
	})

	describe('Promise.then() unit test four',() => {

		it("first", function() {
	  		Promise.reject()
			  .then( () => 99, () => 42 ) // onRejected returns 42 which is wrapped in a resolving Promise
			  .then( solution => expect(solution).toBe(42) ); // Resolved with 42
	    });
	})

	describe('Promise.then() unit test five',() =>{
		it("first", function() {
			Promise.resolve()
			  .then( () => {
			    // 使 .then() 返回一个 rejected promise
			    throw 'Oh no!';
			  })
			  .catch( reason => {
			  	expect(reason).toBe('Oh no!')
			  	return 'then 2';
			  })
			  .then( (value) => {
			    expect(value).toBe('then 2');
			  });
		})
	})

	describe('Promise.then() unit test six',() =>{
		it("first", function() {
			function resolveLater(resolve, reject) {
			  setTimeout(function () {
			    resolve(10);
			  }, 1000);
			}
			function rejectLater(resolve, reject) {
			  setTimeout(function () {
			    reject(20);
			  }, 1000);
			}

			var p1 = Promise.resolve('foo');
			var p2 = p1.then(function() {
			  return new Promise(resolveLater);
			});
			p2.then(function(v) {
			  expect(v).toBe(10);  
			}, function(e) {
			  console.log('rejected', e);
			});

			var p3 = p1.then(function() {
			  return new Promise(rejectLater);
			});
			p3.then(function(v) {
			  console.log('resolved', v);
			}, function(e) {
			  expect(v).toBe(20);   
			});
		})
	})
})

describe('Promise.catch() unit test', () => {

	describe('Promise.catch() unit one',function(){
		let p1 = new Promise(function(resolve, reject) {
			  resolve('Success');
		});
		it('first',function(){
			p1.then(function(value) {
			  expect(value).toBe('Success');   
			  throw 'oh, no!';
			}).catch(function(e) {
			  expect(e).toBe('oh, no!');   
			}).then(function(){
			  let value = "after a catch the chain is restored";
			  expect(value).toBe('after a catch the chain is restored');   
			}, function () {
			  console.log('Not fired due to the catch');
			});
		})

		it('two',function(){
			p1.then(function(value) {
			  expect(value).toBe('Success');   
			  return Promise.reject('oh, no!');
			}).catch(function(e) {
			  expect(e).toBe('oh, no!'); 
			}).then(function(){
			  let value = "after a catch the chain is restored";
			  expect(value).toBe('after a catch the chain is restored');   
			}, function () {
			  console.log('Not fired due to the catch');
			});
		})
	})
})

describe('Promise.finally unit test',() => {

	describe('Promise.finally() unit test one',() => {

		it('first',function(){
			let isLoading = true;
			let myRequest = 'http://m.wxjysgcd.com/channel/guestbookAdd';
			fetch(myRequest).then(function(response) {
	    var contentType = response.headers.get("content-type");
	    if(contentType && contentType.includes("application/json")) {
	      return response.json();
	    }
	    throw new TypeError("Oops, we haven't got JSON!");
		  })
		  .then(function(json) { /* process your JSON further */ })
		  .catch(function(error) { console.log(error); expect(error).toBe('TypeError: Failed to fetch') })
		  .finally(function() { isLoading = false; expect(isLoading).toBe(false) });
	  })

	})

})


describe('Promise.all unit test', () => {

	describe('Promise.all() unit test one',() => {
		it('first',function(){

			var p1 = Promise.resolve(3);
			var p2 = 1337;
			var p3 = new Promise((resolve, reject) => {
			  setTimeout(resolve, 100, 'foo');
			}); 

			Promise.all([p1, p2, p3]).then(values => { 
				let result_v = [3, 1337, "foo"];
				expect(value).toBe(result_v)
			});
		})
	})

	describe('Promise.all() unit test two',() => {

		let result_p = { _status:'resolved',_value:[1,2,3]}
    let result_p2 = { _status:'resolved',_value:[1,2,3,444]}
    let result_p3 = { _status:'rejected',_value:555}

		it('first',function(){


			// this will be counted as if the iterable passed is empty, so it gets fulfilled
			var p = Promise.all([1,2,3]);
			

			// using setTimeout we can execute code after the stack is empty
			setTimeout(function(){
			    expect(p._status).toEqual(result_p._status);
			    expect(p._value).toEqual(result_p._value);
			    
			    
			});
		})

		it('two',function(){
			// this will be counted as if the iterable passed contains only the resolved promise with value "444", so it gets fulfilled
			var p2 = Promise.all([1,2,3, Promise.resolve(444)]);
			

			setTimeout(function(){
			    
			    expect(p2._status).toEqual(result_p2._status);
			    expect(p2._value).toEqual(result_p2._value);
			    
			    
			});
		})

		it('three',function(){
			// this will be counted as if the iterable passed contains only the rejected promise with value "555", so it gets rejected
			var p3 = Promise.all([1,2,3, Promise.reject(555)]);
			setTimeout(function(){
				expect(p3._status).toEqual(result_p3._status);
			  expect(p3._value).toEqual(result_p3._value);
			})
		})
	})

	describe('Promise.all() unit test three',function(){

		it('Promise.all() success async',function(){
			// we are passing as argument an array of promises that are already resolved,
			// to trigger Promise.all as soon as possible
			var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

			var p = Promise.all(resolvedPromisesArray);
			// immediately logging the value of p
			expect(p._status).toBe('pending');

			// using setTimeout we can execute code after the stack is empty
			setTimeout(function(){
			    expect(p._status).toBe('resolved');
			});

		})

		it('Promise.all() failed async',function(){
			var mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
			var p = Promise.all(mixedPromisesArray);
			expect(p._status).toBe('pending');
			setTimeout(function(){
			    expect(p._status).toBe('rejected');
			});
		})

		it('Promise.all() Null sync',function(){
			var p = Promise.all([]); // will be immediately resolved
			var p2 = Promise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously
			expect(p._status).toBe('resolved');
			expect(p2._status).toBe('pending');

			setTimeout(function(){
			    expect(p2._status).toBe('resolved');
			});
		})

	})

	describe('Promise.all() unit test four',function(){
		it('have one of Promise status is rejected ,will to be call reject function',function(){
			var p1 = new Promise((resolve, reject) => { 
			  setTimeout(resolve, 1000, 'one'); 
			}); 
			var p2 = new Promise((resolve, reject) => { 
			  setTimeout(resolve, 2000, 'two'); 
			});
			var p3 = new Promise((resolve, reject) => {
			  setTimeout(resolve, 3000, 'three');
			});
			var p4 = new Promise((resolve, reject) => {
			  setTimeout(resolve, 4000, 'four');
			});
			var p5 = new Promise((resolve, reject) => {
			  reject('reject');
			});

			Promise.all([p1, p2, p3, p4, p5]).then(values => { 
			  console.log(values);
			}, reason => {
				expect(reason).toBe('reject');
			});

			//You can also use .catch
			Promise.all([p1, p2, p3, p4, p5]).then(values => { 
			  console.log(values);
			}).catch(reason => { 
			  expect(reason).toBe('reject');
			});
		})
	})
})


describe('Promise.race() unit test',function(){
	describe('Promise.race() unit test one',function(){

		it('Promise.race() async',function(){
			var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

			var p = Promise.race(resolvedPromisesArray);
			// immediately logging the value of p
			expect(p._status).toBe('pending');

			// using setTimeout we can execute code after the stack is empty
			setTimeout(function(){
			   expect(p._status).toBe('resolved');
			   expect(p._value).toBe(33);
			});

		})

		it('Promise.race() setTimeout',function(){
			var p1 = new Promise(function(resolve, reject) { 
			    setTimeout(resolve, 500, "one"); 
			});
			var p2 = new Promise(function(resolve, reject) { 
			    setTimeout(resolve, 100, "two"); 
			});

			Promise.race([p1, p2]).then(function(value) {
			  // 两个都完成，但 p2 更快
			  expect(value).toBe('two');
			});

			var p3 = new Promise(function(resolve, reject) { 
			    setTimeout(resolve, 100, "three");
			});
			var p4 = new Promise(function(resolve, reject) { 
			    setTimeout(reject, 500, "four"); 
			});

			Promise.race([p3, p4]).then(function(value) {
			  expect(value).toBe('three');           
			}, function(reason) {
			  // 未被调用
			});

			var p5 = new Promise(function(resolve, reject) { 
			    setTimeout(resolve, 500, "five"); 
			});
			var p6 = new Promise(function(resolve, reject) { 
			    setTimeout(reject, 100, "six");
			});

			Promise.race([p5, p6]).then(function(value) {
			  // 未被调用             
			}, function(reason) {
			  expect(value).toBe('six');       
			});
		})

	})
})

describe('Promise.reject() unit test',function(){
	describe('Promise.reject() unit test one',function(){
		it('Testing static reject',function(){
			Promise.reject("Testing static reject").then(function(reason) {
			  // 未被调用
			}, function(reason) {
				expect(reason).toBe('Testing static reject')
			});

			Promise.reject(new Error("fail")).then(function(result) {
			  // 未被调用
			}, function(error) {
			  expect(reason).toBe('stacktrace')
			});
		})
	})
})

describe('Promise.resolve() unit test',function(){
	describe('Promise.resolve() unit test one',function(){
		it('first test',function(){

			Promise.resolve("Success").then(function(value) {
			  expect(value).toBe('Success');
			}, function(value) {
			  // 不会被调用
			});
		})

		it('two',function(){

			var p = Promise.resolve([1,2,3]);
			p.then(function(v) {
			  console.log(v[0]); // 1
			  expect(v).toContain(1)
			});

		})

		it('three',function(){

			var original = Promise.resolve('我在第二行');
			var cast = Promise.resolve(original);
			cast.then(function(value) {
				expect(value).toBe('我在第二行')
			});

		})

		it('four',function(){
			// Resolve一个thenable对象
			var p1 = Promise.resolve({ 
			  then: function(onFulfill, onReject) { onFulfill("fulfilled!"); }
			});

			expect( p1 instanceof Promise ).toBeTruthy()											// true, 这是一个Promise对象

			p1.then(function(v) {
				expect(v).toBe('fulfilled!')																		//  输出"fulfilled!"
			  }, function(e) {
			    // 不会被调用
			});

			// Thenable在callback之前抛出异常
			// Promise rejects
			var thenable = { then: function(resolve) {
			  throw new TypeError("Throwing");
			  resolve("Resolving");
			}};

			var p2 = Promise.resolve(thenable);
			p2.then(function(v) {
			  // 不会被调用
			}, function(e) {
			  expect(e).toThrowError(TypeError,'Throwing');
			});

			// Thenable在callback之后抛出异常
			// Promise resolves
			var thenable = { then: function(resolve) {
			  resolve("Resolving");
			  throw new TypeError("Throwing");
			}};

			var p3 = Promise.resolve(thenable);
			p3.then(function(v) {
			  expect(e).toBe('Resolving');
			}, function(e) {
			  // 不会被调用
			});
		})

	})
})


