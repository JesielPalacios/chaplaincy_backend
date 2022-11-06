db('hackathon_development').collection('customers').find({}).limit(100).toArray()

db('hackathon_development').collection('customers').drop()