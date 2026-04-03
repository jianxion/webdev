# Shopping Website 学习教程

这是一个基于 React、Vite、Redux 和 TypeScript 的小型购物网站项目。它的功能不复杂，但非常适合用来学习前端工程里的几个核心能力：

- React 组件拆分
- React Router 页面切换
- Context 和 Redux 的职责划分
- TypeScript 的领域建模和类型收敛
- 前端请求第三方 API 并做数据映射

这份文档不是模板说明，而是一份面向学习的走读教程。建议你打开项目后，跟着这里的顺序一边读一边看代码。

## 1. 这个项目能做什么

项目目前包含以下流程：

1. 用户进入首页。
2. 如果没有登录，就先看到登录表单。
3. 登录成功后，看到商品列表。
4. 点击某个商品，进入详情页。
5. 在详情页点击加入购物车。
6. 进入购物车页，查看、删除商品或清空购物车。

虽然功能简单，但它已经覆盖了典型前端应用的几条核心链路：

- 页面状态
- 路由状态
- 异步请求
- 全局状态
- 类型约束

## 2. 如何运行项目

先安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认会看到类似地址：

```bash
http://localhost:5173
```

生产构建：

```bash
npm run build
```

本项目已经通过构建验证，所以你可以把它当作一个可运行的 TypeScript 学习样例。

## 3. 项目结构怎么理解

项目最重要的目录是 `src/`。

### 3.1 入口文件

`src/main.tsx`

这是整个应用的启动入口。它做了三件事：

1. 找到 HTML 里的 `root` 节点。
2. 用 React 挂载应用。
3. 用 Redux 的 `Provider` 把全局 store 注入给整个组件树。

如果你要理解“React 应用从哪里开始运行”，先看这里。

### 3.2 应用根组件

`src/App.tsx`

这是页面结构的总装配点。它主要负责：

1. 定义路由。
2. 管理登录状态 `isLogin`。
3. 管理当前选中的商品 `selectedProduct`。
4. 用 `ProductProvider` 把商品上下文传给子组件。

你可以把它理解成整个前端应用的“壳”。

### 3.3 页面和组件

`src/components/` 目录里是主要业务组件：

- `Main.tsx`：首页主体区域，决定显示登录页还是商品列表。
- `Login.tsx`：登录表单。
- `List.tsx`：商品列表和数据请求。
- `Singlepage.tsx`：商品详情页。
- `Cart.tsx`：购物车页面。
- `Navbar.tsx`：顶部导航栏。

### 3.4 类型定义

`src/types.ts`

这是这个项目里最值得重点学习的文件之一。它定义了：

- `Product`
- `ProductRating`
- `CartState`
- `DummyJsonProduct`
- `DummyJsonProductsResponse`

这代表了两种不同的类型层级：

1. 外部 API 类型
2. 项目内部领域模型类型

这是生产项目里非常重要的思想。不要把第三方接口返回值直接散在全项目里使用，而是先做一次标准化，再让 UI 依赖你自己的模型。

## 4. 先从运行流程看懂项目

如果你第一次读这个项目，建议按下面顺序走：

1. `src/main.tsx`
2. `src/App.tsx`
3. `src/components/Main.tsx`
4. `src/components/Login.tsx`
5. `src/components/List.tsx`
6. `src/components/Singlepage.tsx`
7. `src/components/Cart.tsx`
8. `src/components/store.ts`
9. `src/components/reducers/`
10. `src/components/actions/`

这是最接近运行时的阅读顺序。

## 5. 首页是怎么工作的

`Main.tsx` 的逻辑非常值得你理解，因为它展示了“条件渲染 + 本地持久化状态”的组合。

它在 `useEffect` 里读取：

```ts
localStorage.getItem('islogin')
```

如果值是 `'true'`，就把登录状态设置为已登录；否则是未登录。

然后组件根据 `isLogin` 的值决定渲染：

- 已登录：显示 `List`
- 未登录：显示 `Login`

这体现的是 React 最基础但最重要的思想：UI 是状态的函数。

## 6. 登录模块应该学什么

`Login.tsx` 看起来简单，但里面有几个很实用的 TypeScript 点。

### 6.1 Props 接口

组件先定义：

```ts
interface LoginProps {
	isLogin: boolean;
	onSetIsLogin: (nextValue: boolean) => void;
}
```

这代表组件输入是明确的，而不是模糊的。真实项目里，组件边界要尽量清晰。

### 6.2 事件类型

登录提交函数不是直接用隐式 `event`，而是显式写成：

```ts
FormEvent<HTMLFormElement>
```

这样 `preventDefault()`、表单上下文、IDE 补全都会更可靠。

### 6.3 本地持久化

登录成功后写入：

```ts
localStorage.setItem('islogin', 'true')
```

这里注意是字符串 `'true'`，不是布尔值 `true`。因为 `localStorage` 本质上只能存字符串。这个细节很多初学者会忽略。

## 7. 商品列表模块应该学什么

`List.tsx` 是这个项目里最适合学习“异步请求 + 类型映射”的文件。

### 7.1 为什么不用接口返回值直接渲染

项目现在请求的是：

```ts
https://dummyjson.com/products
```

这个接口返回的字段不是我们内部组件最想要的结构，比如它给的是 `thumbnail`，而项目内部统一使用 `image`。所以代码里写了：

```ts
function mapDummyJsonProduct(product: DummyJsonProduct): Product
```

这个函数的作用是：

1. 接受第三方 API 格式。
2. 转换成项目内部统一的 `Product`。
3. 保证其余组件不用关心第三方接口细节。

这是 production level TypeScript 非常重要的习惯。

### 7.2 为什么要建 loading 和 error 状态

请求数据时，项目不仅有 `items`，还有：

- `isLoading`
- `errorMessage`

这很重要，因为真实 UI 不只有“成功”一种状态，至少还应考虑：

1. 正在加载
2. 请求失败
3. 请求成功但无数据

TypeScript 的价值之一，就是逼你把这些状态显式建模，而不是全靠默认假设。

### 7.3 为什么要做 effect cleanup

组件里用了一个 `isSubscribed` 标志，目的是防止组件卸载后还继续调用 `setState`。这个写法虽然简单，但它体现了一个很成熟的意识：

异步请求不只是“发请求拿数据”，还要处理组件生命周期边界。

## 8. 商品详情页应该学什么

`Singlepage.tsx` 适合学习 TypeScript 里最常见的联合类型设计：

```ts
selectedProduct: Product | null
```

为什么不是直接写 `Product`？

因为用户可能还没有选中商品，或者用户直接访问详情页路由。这种情况下值就是空的。既然这是业务真实情况，就应该让类型也真实表达出来。

于是组件先处理：

```ts
if (!selectedProduct) {
	return ...
}
```

然后才渲染正式详情内容。

这是一种很值得养成的习惯：不要回避空值，而是明确建模并处理它。

## 9. 购物车模块应该学什么

`Cart.tsx` 展示的是 Redux 的使用方式。

它通过：

- `useAppSelector`
- `useAppDispatch`

来读取和修改全局状态。

### 9.1 为什么不用原始的 useSelector 和 useDispatch

因为原始版本在 TypeScript 项目里很容易退化成 `any`。所以这里封装了类型安全的 hooks：

- `src/components/hooks.ts`

这样每个组件里都能拿到正确的：

- `RootState`
- `AppDispatch`

这会让 Redux 使用体验明显变好。

### 9.2 购物车数据为什么适合放 Redux

当前选中商品 `selectedProduct` 放在 Context 里，而购物车放在 Redux 里，这是一种有意的分工：

- `selectedProduct` 更像临时页面共享状态。
- `cart.items` 更像应用级全局状态。

虽然这个项目规模不大，但这种分层思路是值得你学的。

## 10. Redux 这部分怎么理解

如果你之前没学过 Redux，可以把它拆成 4 个文件来看。

### 10.1 action

`src/components/actions/cartActions.ts`

这里定义了：

- `addToCart`
- `removeFromCart`
- `clearCart`

同时也定义了 action type 常量：

- `ADD_TO_CART`
- `REMOVE_FROM_CART`
- `CLEAR_CART`

### 10.2 reducer

`src/components/reducers/cartReducer.ts`

reducer 根据 action 更新购物车状态。比如：

- 添加商品：把商品追加到数组
- 删除商品：按 `id` 过滤
- 清空购物车：把 `items` 变成空数组

### 10.3 root reducer

`src/components/reducers/index.ts`

这里用 `combineReducers` 组合多个 reducer。虽然现在只有 cart 一个 reducer，但结构已经有扩展性了。

### 10.4 store

`src/components/store.ts`

store 创建完之后，还顺手导出了：

```ts
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

这是很标准的 TypeScript Redux 写法。不要手写这些类型，尽量从真实 store 推导。

## 11. Context 这部分怎么理解

`src/components/ProductContext.tsx` 是另一个很值得学习的文件。

它定义了：

```ts
interface ProductContextValue {
	selectedProduct: Product | null;
	setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
}
```

然后用：

```ts
createContext<ProductContextValue | undefined>(undefined)
```

这不是随便写的，而是一个比较稳的模式。原因是：

1. 如果 provider 忘了包裹，context 就是 `undefined`。
2. `useProductContext()` 里会主动抛错。
3. 这样错误会尽早暴露，而不是 silently fail。

很多教程会给 context 一个假的默认值，这在小 demo 可以工作，但在真实项目里不是最稳的做法。

## 12. TypeScript 在这个项目里到底学什么

很多人学 TypeScript 会陷入一个误区：只记语法，不学建模。这个项目更值得你学的是“怎么表达真实业务”。

### 12.1 联合类型

例如：

```ts
Product | null
```

它表达的是“有值或者没值”这种真实状态。

### 12.2 接口定义边界

例如组件 props、API 返回值、Context value、Redux state，都先定义接口。

### 12.3 从实现推导类型

例如：

```ts
ReturnType<typeof store.getState>
```

这比手写 `RootState` 更稳，因为如果 store 结构变化，类型会自动跟着变。

### 12.4 先统一内部模型，再接第三方接口

这就是 `DummyJsonProduct -> Product` 映射的意义。以后你换 API，只需要改映射层，不需要重构整站组件。

## 13. 建议你怎么读代码

如果你是为了面试或找工作，建议不要只“看懂功能”，而是按下面方式做主动学习。

### 第一轮：看运行流程

目标是回答这几个问题：

1. 页面从哪里启动？
2. 路由在哪里定义？
3. 登录状态是谁控制的？
4. 商品数据在哪里请求？
5. 购物车数据放在哪里？

### 第二轮：看数据流

重点追踪一条完整链路：

1. 在列表页点击商品。
2. `setSelectedProduct(item)` 被调用。
3. 跳转到详情页。
4. 点击加入购物车。
5. Redux state 更新。
6. 在购物车页把数据渲染出来。

### 第三轮：看类型设计

重点问自己：

1. 为什么某些地方用 `Product | null`？
2. 为什么 Redux 要用 typed hooks？
3. 为什么 API 返回值不直接给组件？
4. 哪些状态应该局部管理，哪些适合全局管理？

## 14. 你可以做哪些练习

如果你真的想靠这个项目提升能力，不要停留在“能运行”。下面这些练习非常有价值。

### 练习 1：补齐详情页信息

在 `Singlepage.tsx` 里把下面字段也显示出来：

- description
- category
- rating

这样你会更熟悉 `Product` 类型的使用。

### 练习 2：给购物车加数量

当前购物车只是简单追加商品。你可以把 `CartState` 改成更真实的结构，例如：

```ts
items: Array<{
	product: Product;
	quantity: number;
}>
```

这是一个非常好的 TypeScript 建模练习。

### 练习 3：抽离 API 服务层

把 `List.tsx` 里的请求逻辑移到：

```ts
src/services/products.ts
```

让组件只负责展示，服务层负责请求和映射。这会更接近真实项目结构。

### 练习 4：加错误边界

给应用加一个 React Error Boundary，学习运行时异常和渲染错误的处理方式。

### 练习 5：改用 Redux Toolkit

当前项目用的是经典 Redux。你可以尝试升级成 Redux Toolkit，顺便理解为什么现代 React 项目更偏向它。

## 15. 如果你在准备面试，应该重点会讲什么

如果面试官让你讲这个项目，不要只说“我做了一个购物网站”。更好的表达方式是：

1. 我用 React Router 组织页面结构。
2. 我用 TypeScript 定义了领域模型和 API 响应类型。
3. 我把第三方接口数据映射成内部统一的 `Product` 模型。
4. 我把临时共享状态放 Context，把购物车这种全局状态放 Redux。
5. 我显式处理了 loading、error 和空值场景。

如果你能这么讲，说明你不是只会写页面，而是已经开始理解工程设计了。

## 16. 这个项目现在还有哪些可以继续改进

虽然这个项目已经能作为学习材料，但从 production 视角看，还可以继续提高：

1. 用 Redux Toolkit 替代经典 Redux。
2. 增加 API service 层。
3. 增加测试。
4. 增加更好的 UI 状态反馈。
5. 优化登录逻辑，不把示例账号硬编码在组件里。
6. 给详情页做更稳的路由参数设计，而不是只依赖 Context。

其中第 6 点尤其值得注意。现在如果用户刷新详情页，`selectedProduct` 可能丢失，这就是为什么真实项目里通常会把商品 ID 放进路由里，例如 `/products/:id`。

## 17. 一份推荐学习路径

如果你想把这个项目变成自己的 TypeScript 训练场，可以按这个节奏来：

1. 完整读懂当前代码。
2. 自己口述一次数据流。
3. 把详情页路由改成 `/products/:id`。
4. 把购物车改成带数量模型。
5. 把请求逻辑抽到 service 层。
6. 引入 Redux Toolkit。
7. 给关键流程写测试。

这条路线走完，你对 React + TypeScript 的理解会明显提高，而且会更接近真实工作场景。

## 18. 总结

这个项目最适合你的地方，不是功能多少，而是它覆盖了前端开发中非常重要的几种基本功：

- 组件拆分
- 路由组织
- 异步请求
- 本地状态和全局状态管理
- TypeScript 类型建模
- 外部 API 到内部模型的映射

如果你认真把这些地方吃透，再继续做结构优化和功能扩展，这个项目就不只是一个练手 demo，而是一个很好的前端工程学习样板。
