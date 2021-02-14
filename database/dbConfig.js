const knex=require('knex');

const knexFile=require('../knexfile');

const dbConfig=knex(knexFile.development);

module.exports=dbConfig;