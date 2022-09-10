const app = require('../app');
const User = require('../Modal/user');
const supertest = require('supertest');
const { login } = require('../controllers/userController');
const { render } = require('../app');
const request = supertest(app);
const {ObjectId} = require('mongoose').Schema.Types;

describe('Test user registration flow',()=>{
    it('Test for user with invalid email id',async()=>{
        const response = await request.post('/user/register').send({
            email:'abcfjdwfkjdfd'
        });

        expect(response.status).toBe(400);
       // expect(validationResult).toBeCalledTimes(1);
    })

     it("Test for user with invalid password id", async () => {
       const response = await request.post("/user/register").send({
         email: "abc@abc.com",
         userName:"abcdef",
         password:""
       });
       console.log(response.text);
       expect(response.status).toBe(400);
       expect(response.text.includes("Invalid value")).toBe(true);
     });

     it('Test a existing user trying to register',async()=>{
        User.findOne = jest.fn().mockResolvedValue([
          {
            _id: "507f1f77bcf86cd799439011",
            name: "Anshu",
            password: "chdwcjdicdcidcdic",
          },
        ]);
        const response = await request.post("/user/register").send({
          email: "abc@abc.com",
          userName:"abcdef",
          password:"abcdefghj"
        });
        expect(response.status).toBe(400);
        expect(response.body.data).toEqual("Email already exist.Please login.");

     })

     it('Test register user success',async ()=>{
        User.findOne = jest.fn().mockResolvedValue(null);
        User.create = jest.fn().mockResolvedValue({
            _id: "507f1f77bcf86cd799439011",
            name: "Anshu",
            password: "chdwcjdicdcidcdic",
          });
        const response = await request.post("/user/register").send({
            email: "abc@abc.com",
            userName: "abcdef",
            password: "abcdefghj",
            });
        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
     })

})