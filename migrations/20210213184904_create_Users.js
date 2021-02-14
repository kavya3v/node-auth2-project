
exports.up = async function(knex) {
  await knex.schema.createTable("users",(table)=>{
    table.increments();
    // table.uuid('id').primary()
    table.string("username",128).notNullable().unique();
    table.string("password",128).notNullable();
    table.string("department",128).notNullable().defaultTo("IT");
  })
}

exports.down = async function(knex) { 
  await knex.schema.dropTableIfExists("users")
}
