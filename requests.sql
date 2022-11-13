-- Active: 1668152624709@@127.0.0.1@27017@chaplaincy_development

db('chaplaincy_development').collection('beneficiaries').find({}).limit(100).toArray();

db('chaplaincy_development').collection('beneficiaries').drop();