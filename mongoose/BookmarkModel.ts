import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

/**
 * The below  variable  is used to bookmark model from its schema.
 */
const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);
export default BookmarkModel;