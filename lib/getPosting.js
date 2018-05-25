module.exports.getPosting = (searchQueries) => {
    return Posting.aggregate([
      { $match: { wordID: { $in: searchQueries } } },
      {
        $group: {
          _id: "$docID",
          post: { $push: "$$ROOT" },
          count: { $sum: 1 },
          countSumFre: { $sum: "$frequency" }
        }
      },
      {
        $sort: { count: -1, countSumFre: -1 }
      },
      { $limit: 10 },
      {
        $lookup: {
          from: "Location",
          localField: "post.docID",
          foreignField: "_id",
          as: "loc"
        }
      },
      {
        $lookup: {
          from: "Dictionary",
          localField: "post.wordID",
          foreignField: "_id",
          as: "dict"
        }
      }
    ]);
  }
