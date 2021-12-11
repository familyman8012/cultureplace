import createHandler from "../middleware";
import Product from "../models/product";
import _ from "lodash";

const productRouter = createHandler();

productRouter.post(async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.query", req.query);
  const { page, meetingcycle, limit } = req.query;

  const Numberlimit = Number(limit);

  console.log("page, limit", page, limit);

  try {
    const { searchInput = "", filterFind = [] } = req.body;

    // 키워드 검색
    const data1 = {
      $search: {
        index: "productSearch",
        text: { query: searchInput, path: ["title", "people"] }
      }
    };

    // 체크박스 옵션리스트
    const selectType = ["location", "meetday", "genre"];

    // 선택한 체크박스 추가
    const matchData = [{ ["meetingcycle"]: { $in: [meetingcycle] } }];
    for (let i = 0; i < selectType.length; i++) {
      matchData.push(
        filterFind[i].length !== 0
          ? { [selectType[i]]: { $in: filterFind[i] } }
          : ``
      );
    }

    // mongodb 에서 체크박스 리스트로 검색할 수 있게 $match 설정.
    const data2 = {
      $match: Object.assign(...matchData)
    };

    console.log("searchInput", "filterFind", searchInput, filterFind);
    console.log("data1", "data2", data1, data2);

    // 키워드 검색이 비어있지 않으면 추가, 체크박스 옵션 중 하나라도 체크했다면 추가.
    let searchOp = [];
    searchInput !== "" && searchOp.push(data1);
    filterFind.some(el => el.length !== 0) && searchOp.push(data2);

    // 키워드검색과 체크박스 검색 등을 합쳐서 검색 결과 가져오기
    let products;
    let productsCount;
    let hasNextPage;
    if (searchInput === "" && filterFind.every(el => el.length === 0)) {
      console.log("1번으로 들어왔나?", searchInput, filterFind);
      [products, productsCount] = await Promise.all([
        Product.find()
          .skip((page - 1) * Numberlimit)
          .limit(Numberlimit),
        Product.find().count()
      ]);
      hasNextPage = page < Math.ceil(productsCount / Numberlimit);
    } else {
      console.log("2번으로 들어왔나?", searchInput, filterFind);

      products = await Product.aggregate(searchOp);
      productsCount = await products.length;
      hasNextPage = false;
    }

    console.log(
      "productsCount page Numberlimit",
      productsCount,
      page,
      Numberlimit
    );
    // const hasNextPage = page < Math.ceil(productsCount / Numberlimit);
    return res.send({ products, hasNextPage });
  } catch {
    res.status(500).send(err);
  }
});

export default productRouter;
