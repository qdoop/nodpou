assert = require("assert")

describe 'Array0', ->
	describe '#indexOf()', ->
		it 'should return -1 when the value is not present', ()->
			assert.equal(-1, [1,2,3].indexOf(5))
			assert.equal(-1, [1,2,3].indexOf(0))
			
			
describe 'Array1', ->
	beforeEach (done)->
		console.log 'beforeEach'
		done()
		
	afterEach (done)->
		console.log 'afterEach'
		done()
	
	describe '#indexOf()', ->
		before (done)->
			console.log 'before'
			done()
		
		after (done)->
			console.log 'after'
			done()
			
		it 'should return -1 when the value is not present', (done)->
			assert.equal(-1, [1,2,3].indexOf(5))
			assert.equal(-1, [1,2,3].indexOf(0))
			
			err={}
			throw err
			done()
			
			
	describe '#indexOfAAAAA()', ->
		it 'should return -1 when the value is not present', (done)->
			assert.equal(-1, [1,2,3].indexOf(5))
			assert.equal(-1, [1,2,3].indexOf(0))
			
			err={}
			done()
			
			
describe 'Array2', ->
	describe '#indexOf()', ->
		it 'should return -1 when the value is not present', (done)->
			assert.equal(-1, [1,2,3].indexOf(5))
			assert.equal(-1, [1,2,3].indexOf(0))
			
			err={}
			done({})	


