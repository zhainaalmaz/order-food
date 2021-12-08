import CartContext from './cart-contex';
import React, { useReducer } from 'react';

const defaultCartState = {
  // init state
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // если диспатчтан келген тип ADD барабар болсо
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount; // общая сумма + (наименование * кол-во) = updatedTotalAmount

    const existingCartItemIndex = state.items.findIndex(
      // с помощью  findindex item id менен actionдон келген  id  cравниваем
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex]; // бул переменныйда биз текшерген item c индексом будет хранится
    let updatedItems;
    if (existingCartItem) {
      // если есть выбранный existingCartItem то их храним в updateditem c помощью spread operator получаем копию и добавляем к нему новые эмаунты
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items]; // открываем новый массив, копируем все предыдущие состоянии
      updatedItems[existingCartItemIndex] = updatedItem; // превстейттерди индексторы менен updateItem ге киргизип жанылап коебуз
    } else {
      updatedItems = state.items.concat(action.item); //с помощью concat создаем новый массив на основе init items,и actionдон келген item кошобуз
    }

    if (action.type === 'CLEAR') {
      // сравниваем тип, если совпадает то возвращаем init state
      return defaultCartState;
    }
    console.log(state);

    return {
      items: updatedItems, // возвращаем updatedItems & totalAmount как ответ на dispatch
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id // с помощью  findindex item id менен actionдон келген  id  cравниваем
    );

    const existingItem = state.items[existingCartItemIndex]; // биз текшерген itemдин индекси алабыз
    const updatedTotalAmount = state.totalAmount - existingItem.price; // общая суммадан баасына карата минус кылат
    let updatedItems;

    if (existingItem.amount === 1) {
      // проверяем на наличие, и с помощью filter удалаем если айдишки совпадают
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; // копируем все предыдущие itemы,и минусуем от количество
      updatedItems = [...state.items]; // копируем оставщиеся items
      updatedItems[existingCartItemIndex] = updatedItem; // оставщиеся items c index перезаписываем
    }

    return {
      items: updatedItems, // возвращаем updatedItems & totalAmount как ответ на dispatch
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState; // ecли не сработает наша функция, то вернем initstate
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    // dispatch чакырып, пустой обьект ачып, type и свойство беребиз, item ге карап кошобуз
    dispatchCart({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    // dispatch чакырып, пустой обьект ачып, type и свойство беребиз, id ге карап очуробуз
    dispatchCart({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    // // dispatch чакырып, пустой обьект ачып, type беребиз, типке карап тазалайт
    dispatchCart({ type: 'CLEAR' });
  };

  const cartContext = {
    // временный обьект который будет хранить актуальные значении, которых мы в дальнейшем будем использовать
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
