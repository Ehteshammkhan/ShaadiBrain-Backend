import Wedding from "../../models/Wedding.js";
import User from "../../models/User.js";
import { asyncHandler, ApiResponse } from "../../utils/index.js";

export const getMyWeddings = asyncHandler(async (req, res) => {
  const weddings = await Wedding.findAll({
    include: [
      {
        model: User,
        where: { id: req.user.id },
        attributes: [], 
        through: { attributes: [] }, 
      },
    ],
  });

  return res.json(
    new ApiResponse(200, weddings, "Weddings fetched successfully")
  );
});