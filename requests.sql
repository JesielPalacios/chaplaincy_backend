-- Active: 1668152624709@@127.0.0.1@27017@chaplaincy_development

db('chaplaincy_development').collection('users').find({}).limit(100).toArray();
db('chaplaincy_development').collection('users').drop();

db('chaplaincy_development').collection('beneficiaries').find({}).limit(100).toArray();
db('chaplaincy_development').collection('beneficiaries').drop();

db('chaplaincy_development').collection('images').find({}).limit(100).toArray();
db('chaplaincy_development').collection('images').drop();

db('chaplaincy_development').collection('interviews').find({}).limit(100).toArray();
db('chaplaincy_development').collection('interviews').drop();