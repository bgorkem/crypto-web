
import {myAdder}  from '../library';


describe ('library test',()=>{ 
    it ('should work', ()=>{
        expect(true).toBe(true)
    })

    it('should add', ()=>{
        expect(myAdder(4,3)).toBe(7)
    })

    
})