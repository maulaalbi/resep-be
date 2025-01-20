import supertest from "supertest";
import { createTestUser, removeTestUser ,getTestUser, removeTestUserUpdate } from "./util-test"
import { web } from "../src/application/web";
import bcrypt from "bcrypt";
import { logger } from "../src/application/logger";


describe('POST /api/users',  function ()  { 

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can regist', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                email : "test@gmail.com",
                password : "12345",
                name : "test"
            });

            expect(result.status).toBe(200);
            expect(result.body.data.email).toBe('test@gmail.com');
            expect(result.body.data.name).toBe('test');
            expect(result.body.data.password).toBeUndefined();


    })

    it('should cant regist', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username : "",
                password : "",
                name : ""
            });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
    })
 })

 describe('POST /api/users/login',  function ()  { 

    beforeEach(async()=>{
        await createTestUser();
    })
    afterEach(async () => {
        await removeTestUser();
    })

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                email: "test@gmail.com",
                password: "123456" 
            })
            

            expect(result.status).toBe(200);
            expect(result.body.data.token).toBeDefined();
            expect(result.body.data.token).not.toBe("test");


    })

    it('should can regist', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: "" 
            })
            

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();


    })


 });


 describe('get /api/users/current', function (){
    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });

    it('should get current user', async ()=>{
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization','test');


        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe('test@gmail.com');
        expect(result.body.data.name).toBe('test');

    })

    //  it('should reject if token invalid', async ()=>{
    //     const result = await supertest(web)
    //     .get('/api/users/current')
    //     .set('Authorization','salah');


    //     expect(result.status).toBe(401);
    //     expect(result.body.errors).toBeDefined();

    // })
})

 describe('update ', function() { 
    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });


    it('should update data', async()=>{
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization','test')
        .send({
            name: "albi",
            password: "oke"
        });

        logger.info(result.body)
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('albi');

        const user = await getTestUser();
        expect(await bcrypt.compare('oke',user.password)).toBe(true);
    })
 });
 


