import express from "express";
import { getVal, sendVal, delVal } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await getVal(res);
});

router.post("/values", async (req, res) => {
  const val = req.body?.value;
  if (!val) {
    return res.json({ status: "error", value: "Value undefined" });
  }
  await sendVal(val, res);
});

router.delete("/values/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({ status: "error", value: "ID undefined" });
  }
  await delVal(id);
  res.json({ status: "ok", value: id });
});

export default router;
