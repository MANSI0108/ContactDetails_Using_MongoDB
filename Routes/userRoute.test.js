const chai = require("chai")
const expect = chai.expect;
const chaiHttp = require('chai-http')
const app = require('../app.js')
chai.use(chaiHttp);


describe('users',()=>{

    context('/Post userRegister', () => {

        it('Registration first', (done) => {

            chai.request(app)
                .post('/api/user/register')
                .send({
                    username:'cosine07',
                    password:'123456',
                    email:'abc0108@gmail.com'
                })
                .end((err, res) => {
                    console.log(res.body);
                    expect(res).to.have.status(400);    // <= Test completes before this runs
                    done(err)
                });



        })

    })

   let token 
    context('/Post userLogin', () => {

        it('login of user', (done) => {

            chai.request(app)
                .post('/api/user/login')
                .send({
                    password:'123456',
                    email:'abc0108@gmail.com'
                })
                .end((err, res) => {
                    token = res.body.accessToken;
                    expect(res).to.have.status(200);    // <= Test completes before this runs
                    done(err)
                })

        })

    })


    context('/GET currentloginUser', () => {

        it('Current User', (done) => {

            chai.request(app)
                .get('/api/user/currentUser')
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                    // console.log(res.body);
                    token = res.body.accessToken;
                    expect(res).to.have.status(200);    // <= Test completes before this runs
                    done(err)
                })

        })

    })


})