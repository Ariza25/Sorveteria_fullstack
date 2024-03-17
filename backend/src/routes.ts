import { Router, Request, Response } from "express";
import multer from "multer"

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { DeleteCategoryController } from "./controllers/category/DeleteCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { UpdateProductController } from "./controllers/product/UpdateProduct.Controller";

import { ListUserController } from "./controllers/user/ListUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";

import { CreateSizeController } from "./controllers/size/CreateSizeController";
import { ListSizeController } from "./controllers/size/ListSizeController";
import { DeleteSizeController } from "./controllers/size/DeleteSizeController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { UpdateOrderController } from "./controllers/order/UpdateOrderController";
import { UpdateCategoryController } from "./controllers/category/UpdateCategoryController";
import { UpdateSizeController } from "./controllers/size/UpdateSizeController";
import { CreateContactController } from "./controllers/contact/CreateContactController";
import { ListContactController } from "./controllers/contact/ListContactController";


const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello World" });
});

router.post('/v1/api/product', upload.array('images'), (req: Request, res: Response) => {
    return new CreateProductController().handle(req, res);
})

router.get("/v1/api/products", (req: Request, res: Response) => {
    return new ListProductController().handle(req, res);
});

router.put("/v1/api/product/:id", upload.array('images'), (req: Request, res: Response) => {
    return new UpdateProductController().handle(req, res);
});

router.delete("/v1/api/product/:id", (req: Request, res: Response) => {
    return new DeleteProductController().handle(req, res);
});

router.post("/v1/api/category", (req: Request, res: Response) => {
    return new CreateCategoryController().handle(req, res);
});

router.get("/v1/api/categories", (req: Request, res: Response) => {
    return new ListCategoryController().handle(req, res);
});

router.put("/v1/api/category/:id", (req: Request, res: Response) => {
    return new UpdateCategoryController().handle(req, res);
});

router.delete("/v1/api/category/:id", (req: Request, res: Response) => {
    return new DeleteCategoryController().handle(req, res);
});

router.post('/v1/api/register', (req: Request, res: Response) => {
    return new CreateUserController().handle(req, res);
})

router.get('/v1/api/users', (req: Request, res: Response) => {
    return new ListUserController().handle(req, res);
})

router.post('/v1/api/login', (req: Request, res: Response) => {
    return new AuthUserController().handle(req, res);
})

router.post('/v1/api/size', (req: Request, res: Response) => {
    return new CreateSizeController().handle(req, res);
});

router.get('/v1/api/sizes', (req: Request, res: Response) => {
    return new ListSizeController().handle(req, res);
});

router.put("/v1/api/size/:id", (req: Request, res: Response) => {
    return new UpdateSizeController().handle(req, res);
});

router.delete('/v1/api/size/:id', (req: Request, res: Response) => {
    return new DeleteSizeController().handle(req, res);
});

router.post ('/v1/api/order', (req: Request, res: Response) => {
    return new CreateOrderController().handle(req, res);
})

router.put('/v1/api/order/', (req: Request, res: Response) => {
    return new UpdateOrderController().handle(req, res);
})

router.get ('/v1/api/orders', (req: Request, res: Response) => {
    return new ListOrdersController().handle(req, res);
})

router.delete ('/v1/api/order/:orderId', (req: Request, res: Response) => {
    return new DeleteOrderController().handle(req, res);
})

router.post ('/v1/api/contact', (req: Request, res: Response) => {
    return new CreateContactController().handle(req, res);
})

router.get ('/v1/api/contacts', (req: Request, res: Response) => {
    return new ListContactController().handle(req, res);
})

export default router;