---
templateKey: blog-post
image: /img/products-grid1.jpg
title: Easy Peasy global state in React w/ Hooks
date: 2018-11-11T12:15:11.774Z
description: Test post from Medium
tags:
  - medium
  - react
  - global state
---
> This post assumes some basic knowledge with the new React Hooks feature. If you aren’t familiar with them then I highly recommend you watch the React Conf keynote and Ryan Florence’s talk on the subject.
>
> The first few sections set the stage with a bit of backstory — I’ve tried to keep it as concise as possible, however, if you would rather jump straight to the “conclusion” then click 
>
> [here](https://medium.com/@ctrlplusb/easy-peasy-global-state-in-react-w-hooks-421f5bf827cf#e2af).

React keeps on giving. The recent announcement of Hooks has blown away complexity and completely reinvigorated my love with React. With these new tools at our disposal I decided to reevaluate the libraries and patterns that I reach for to see if I could replace them with native implementations.

One of the immediate considerations was that of global state. Some of the built in React Hooks include useReducer, useState, and useContext. These are powerful primitives, and one could be forgiven for convincing themselves they would never need a 3rd party state library again.

## Try as we might

I decided to put this assumption to the test. Not through a quick and dirty Codesandbox effort — only a real world implementation would win my confidence. So I branched a very complex side project of mine and went for it!

I was flying at first — hooks are awesome, it must be said. I initially felt invigorated and empowered, but as time progressed the more complex components of state management (e.g. async flow and derived state) began to surface and my excitement began to whittle away. These problems required home-baked solutions or 3rd party libraries - diluting the experience for me.

I tried to push on with the migration, but the complexity of my global state continued to grow and eventually I hit a critical point where I was absolutely dying for more a robust and encompassed state solution. Bugs were creeping in and I was finding it notably difficult to identify and resolve them — my debugging tool had been reduced (har har) from the fabulous Redux Dev Tools Extension to the notably simpler console.log.

![meme](https://cdn-images-1.medium.com/max/800/1*UrbI0HOvqmOdDlv2wfNN1A.jpeg)

## The Emperor Strikes Again

The result of my exercise was a conclusion that Hooks are awesome, but they can only take you so far. There still exists complex application state structures in which Redux et al. would be the better choice.

Another outcome was that I had inadvertently reignited my appreciation of Redux and its mature ecosystem. An interesting place to find oneself given the recent push back against it by the community (myself included).

There used to be a dogmatic belief that Redux was a requirement for any “respectable” application. Encouragingly the community is breaking free of this thinking, however, we should take care not to swing the pendulum to the other end. It would be equally irresponsible to declare that there is no place for Redux. We rather should settle upon a pragmatic middle ground, a place where we take the time to consider whether the addition of Redux to a project would bring value.

In my case I felt my project definitely warranted a more robust state system. My mind made up, I was going to allow a 3rd party library to manage my state again.

Redux was calling me.

All that boilerplate though…

![thinking](https://media.giphy.com/media/7TwPbkbwhIGx4PEAQt/giphy.gif)

## All I really want

Okay, so I had accepted the fact that I required a state library, but was Redux the right choice for me? Yes, I had redeveloped an appreciation of the tools and properties of Redux , but to say I was brimming with excitement at the prospect of writing actions, creators, reducers, selectors, etc, for the rest of my life would have been lie.

Aside from this I really wanted to be able to use the new Hooks APIs. I love the way they encapsulate behaviour and promote a code base that is really easy to grok.

A few hook based alternatives to `react-redux` were already surfacing, but given my earlier misgivings about Redux boilerplate I wondered if I should cast the net wider. After some intense Googling I decided I would add the following libraries to the selection pool: Mobx/Mobx State Tree, Rematch and React Easy State.

These projects all impressed me in various ways — each of them has received lots of love, consideration and effort by their contributors. There are some amazing features amongst them; the ease of updating state within Mobx State Tree, the simplicity of React Easy State, and the quick bootstrapping of Rematch. Yes, there were answers to Redux’s boilerplate, however, a Redux substitution often meant losing the parts of Redux I actually loved.

In the end I could not settle on any of them. Each of them had a quality I was after, but none of them had them all. I was caught in an endless cycle trying to decide which library to settle on.

Then a mad idea came to me…

## The Force Awakens

In the attempt to identify a state library I had inadvertently produced a list of the features that I desired; uni-directional data flow, debugging tools, extensibility, zero configuration, asynchronous workflows, derived data, and a simple/intuitive API that promoted rapid development.

I knew what I wanted, but a solution that satisfied all these requirements didn’t exist. So why not build my own?

Yep, it may sound like madness to start from scratch with yet another state management library for React, however, I quickly realised that Redux already offered the solid core of the features that I required. My biggest qualm was its API and configuration. I concluded that there was no need for me to start from scratch. All I needed was to create an abstraction over Redux to get where I wanted it to be.

I fired up VSCode and using a test driven approach I described the API that I desired. Then I worked my way through the implementation until those magic green ticks filled the screen. After 3 nights of intense coding and tinkering I eventually got exactly what I wanted, and boy was I stoked.

![dance](https://media.giphy.com/media/l3q2Z6S6n38zjPswo/giphy.gif)

The exercise was not as difficult as I had originally imagined it would have been, and a lot of credit goes to Redux because of this. It’s an incredible architecture with amazing properties that easily allow for abstractions. I have only endless appreciation for it.

## It’s all too easy now

The result of my efforts is an all-in-one, zero configuration, global state library named Easy Peasy (The amazing package name was kindly donated by the brilliant Siddharth Kshetrapal ❤️). To top it all off, it uses Hooks as its mechanism to integrate with components.

The code is [up and live on GitHub](https://github.com/ctrlplusb/easy-peasy), go check it out!

![beans](https://cdn-images-1.medium.com/max/800/1*YAKA_BWjvvIaXSjFVlv7hw.png)

I’ve been using it aggressively for well over a week now, ironing out the initial bugs and performance issues. There is certainly a massive bias in my opinion, but I must say that I am finding it a breath of fresh air. My velocity and joy levels are soaring as I am smashing out the development of ComicKult.

All you need to do to get started with it is install a single package. Everything you need is included, and no additional configuration is required.

```bash 
npm install easy-peasy
```

> Remember this package depends on the React Hooks feature, which is only available as an alpha release of react/react-dom — v16.7.0-alpha.0. I certainly would not recommend you use this in production, but if you must then perhaps be responsible enough to only use it within your personal projects.

The primary API can easily be illustrated via the following concise snippet.

```javascript
import { StoreProvider, createStore, useStore, useAction } from 'easy-peasy';

// 👇 firstly, create your store by providing your model
const store = createStore({
  todos: {
    items: ['Install easy-peasy', 'Build app', 'Profit'],
    // 👇 define actions
    add: (state, payload) => {
      state.items.push(payload) // 👈 you mutate state to update (we convert
                                //    to immutable updates)
    }
  }
});

function App() {
  return (
    // 👇 secondly, surround your app with the provider to expose the store to your app
    <StoreProvider store={store}>
      <TodoList />
    </StoreProvider>
  );
}

function TodoList() {
  // 👇 finally, use hooks to get state or actions. your component will receive
  //    updated state automatically
  const todos = useStore(state => state.todos.items)
  const add = useAction(dispatch => dispatch.todos.add)
  return (
    <div>
      {todos.map((todo, idx) => <div key={idx}>{todo.text}</div>)}
      <AddTodo onAdd={add} />
    </div>
  )
}
```

Instead of mapping out endless reducers, actions etc you can simply define a model to describe your state. This model is just a good old JavaScript object and can be as simple or complex as you like. It serves to describe your state structure and its default values. Under the hood we will do all the hard work converting your model to the idiomatic structures (reducers, actions etc) that Redux expects.

Let’s break the API down into smaller bites. Firstly, define your model…

```javascript
const model = {
  todos: {
    items: [],
  },
  session: {
    user: null 
  }
};
```

To define actions that will be used to update your state you simply add a function at the appropriate slice of your state.

```javascript
const model = {
  todos: {
    items: [],
    // 👇 an action
    add: (state, payload) => {
      state.items.push(payload);  
    }
  },
  session: {
    user: null 
  }
};
```

Notice how the action receives the slice of state it was added to as its first parameter, with the second parameter containing any payload that may have been provided to the action. You will additionally notice that you mutate the state directly. We use immer here to provide us with the familiarity and ease of a mutation based API. Under the hood it does all the hard work for us, converting any modifications to the state into a single immutable update.

You then provide your model to the createStore which will output a Redux store, the only difference with it and a standard Redux store is that the actions have been conveniently bound against the dispatch property.

```javascript
import { createStore } from 'easy-peasy';

// Pass in your model and you get back a Redux store
const store = createStore(model);

// you can query state as normal
store.getState().todos.items;
// ['Install easy-peasy']

// and dispatch actions
store.dispatch.todos.add('Build an app')
//            |---------|
//                 |- Actions are bound to a path matching model
  
// and access the other standard APIs of a Redux store
store.listen(() => console.log('An update occurred'))
```

To expose your store to your application you provide it to the `StoreProvider`.

```javascript

import { StoreProvider } from 'easy-peasy';

function App() {
  return (
    // 👇 secondly, surround your app with the provider to expose the store to your app
    <StoreProvider store={store}>
      <TodoList />
    </StoreProvider>
  );
}
```

Your components will only receive new state when the respective state it is tracking is updated.

Need to perform effects such as data fetching/persisting? Then use the effect helper.

```javascript
import { createStore, effect } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  session: {
    user: undefined,
    // 👇 define your effectful action
    login: effect(async (dispatch, payload, getState) => {
      const user = await loginService(payload)
      dispatch.session.loginSucceeded(user)
    }),
    loginSucceeded: (state, payload) => {
      state.user = payload
    }
  }
});
```

Notice how you can use async/await, or Promises, or any flavour of asynchronous programming that you like. The dispatch is provided allowing you to update your state with any results.

What about derived state? The select helper has your back.

```javascript
import { select } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  shoppingBasket: {
    products: [{ name: 'Shoes', price: 123 }, { name: 'Hat', price: 75 }],
    // 👇 define your derived state
    totalPrice: select(state =>
      state.products.reduce((acc, cur) => acc + cur.price, 0)
    )
  }
});
```

Derived state will only be recalculated if the state it cares about has changed. It’s memoized out of the box.

Oh, and of course there is full support for Redux Dev Tools. Time travel debugging and all. 😘

![redux devtools](https://cdn-images-1.medium.com/max/800/1*slMosXqOy6-Taiib_CsYxg.png)

It’s been an absolute dream using this library thus far. I’ve built it out of my own genuine needs and hope that you can find it useful too. I’ve already received some heartwarming feedback and appreciate any requests/criticisms aimed at improving the library.

Please check out the library and leave your feedback. ❤️
