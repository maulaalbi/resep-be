import { web } from "../src/application/web.js";
import supertest from "supertest";
import { createTestMeal, createTestUser, getTestMeal, removeAllTestMeal,removeTestUser } from "./util-test"
import { logger } from "../src/application/logger.js";



describe('post /api/meals', function () {
    beforeEach(async()=>{
        await createTestUser();
    })

    afterEach(async()=>{
        await removeAllTestMeal();
        await removeTestUser();
    })

    it('should create meal',async()=>{
        const result = await supertest(web)
            .post('/api/meals')
            .set('Authorization', 'test')
            .send({
                nameMeal: "Apple Frangipan",
                category: "Dessert",
                instructions: "Panaskan oven hingga 200C/180C Kipas/Gas 6.\r\nMasukkan biskuit ke dalam kantong freezer besar yang dapat ditutup kembali dan haluskan dengan rolling pin.",
            });
            
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.nameMeal).toBe('Apple Frangipan');
        expect(result.body.data.category).toBe('Dessert');
        expect(result.body.data.instructions).toBe('Panaskan oven hingga 200C/180C Kipas/Gas 6.\r\nMasukkan biskuit ke dalam kantong freezer besar yang dapat ditutup kembali dan haluskan dengan rolling pin.');
    });

    it('should reject create meals',async()=>{
        const result = await supertest(web)
            .post('/api/meals')
            .set('Authorization', 'test')
            .send({
                nameMeal: "",
                category: "Dessert",
                instructions: "Panaskan oven hingga 200C/180C Kipas/Gas 6.\r\nMasukkan biskuit ke dalam kantong freezer besar yang dapat ditutup kembali dan haluskan dengan rolling pin.",
            });
       
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        
    })
})

describe('get /api/meals', function () {
    beforeEach(async()=>{
        await createTestUser();
        await createTestMeal();
    })

    afterEach(async()=>{
        await removeAllTestMeal();
        await removeTestUser();
    })

    it('should get meals',async()=>{
        const testMeal =  await getTestMeal();

        const result = await supertest(web)
           .get('/api/meals/' + testMeal.id)
           .set('Authorization', 'test');

           logger.info(result.body);
           expect(result.status).toBe(200);
           expect(result.body.data.id).toBe(testMeal.id);
           expect(result.body.data.nameMeal).toBe(testMeal.nameMeal);
           expect(result.body.data.category).toBe(testMeal.category);
           expect(result.body.data.instructions).toBe(testMeal.instructions);
    })
})