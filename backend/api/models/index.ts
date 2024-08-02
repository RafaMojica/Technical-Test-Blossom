import Persons from "./Person.model";
import Comment from "./Comment.model";

Persons.hasMany(Comment);
Comment.belongsTo(Persons);

export default { Persons, Comment };
