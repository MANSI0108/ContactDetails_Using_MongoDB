const chai = require("chai")
const expect = chai.expect;
const chaiHttp = require('chai-http')
const app = require('../app.js')
chai.use(chaiHttp);

describe('contacts', () => {


    let token;
    //let's set up the data we need to pass to the login method
    const userCredentials = {
        email: 'ij123@gmail.com',
        password: '123456'
    }

    before(function (done) {
        //login into the system
        chai.request(app)
            .post("/api/user/login")
            .send(userCredentials)
            .end((err, res) => {

                token = res.body.accessToken;
                //   console.log(res.body.accessToken);
                done(err)
            });

    });

    // get contact

    context('/GET contact', () => {

        it('should get all contacts', (done) => {

            chai.request(app)
                .get('/api/contacts')
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                    // console.log(res.body);
                    expect(res).to.have.status(200);    // <= Test completes before this runs
                    done(err)
                });



        })

    })

    context('/Post contact', () => {
        it('should add contacts', (done) => {
            chai.request(app)
                .post('/api/addcontact')
                .set("Authorization", `Bearer ${token}`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    Name: 'Anu',
                    Email: "As123@gmail.com",
                    PhoneNo: 7539512364,
                    Age: '21',
                })
                .end((err, res) => {
                    // console.log(res.body);
                    expect(res).to.have.status(200);
                    // expect(res.body).to.have.property("Name")
                    done(err);
                })


        })
    })

    context('Update contact',()=>{
        it('should update contact',(done)=>{
          
          chai.request(app)
          .patch('/api/update/65e6b056f3e4dd5b70da442b')
          .set("Authorization", `Bearer ${token}`)
          .send({
            Name: 'Anu',
            Email: "AneriS.123@gmail.com",
            PhoneNo: 12365482,
            Age: '21',
        })
        .end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.status(200);
            done(err);
        })
       

        })
    })

    
    context('Delete contact',()=>{
        it('should delete contact',(done)=>{
          chai.request(app)
          .delete('/api/delete/65e1a9146ab9dd750bf9fa0a')
          .set("Authorization", `Bearer ${token}`)
          .end( (err, res) => {
            // console.log(res.body);
             expect(res).to.have.status(400)
            done();
        })
       
        })
    })



})
