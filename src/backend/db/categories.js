import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Men",
    description: "men collection",
    categoryImage:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    _id: uuid(),
    categoryName: "Women",
    description: "women collection",
    categoryImage:
      "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    _id: uuid(),
    categoryName: "Kid",
    description: "kids collection",
    categoryImage:
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8a2lkcyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];
