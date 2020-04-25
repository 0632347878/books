<template>
  <div class="container">
    <div class="title">
      <div class="title__description">You have lent {{books.length}} books to friends</div>
      <div class="title__info">Lent to:</div>
    </div>
    <ul class="book-list">
      <li class="book" v-for="(book, index) in books" :key="index">
        <div class="book__order">{{index + 1}}</div>
        <div class="book__description">
          <div class="book__title">{{ book.title }}</div>
          <div class="book__author">{{ book.author }}</div>
        </div>
        <div class="book__info">
          <div class="book__person">{{ book.name }}</div>
          <div class="book__date">{{ book.date }}</div>
          <a @click.prevent="state.popup = true; getBook(index); state.editActive=true"
             href="#" class="book__link">
            <span class="book__dots"></span>
          </a>
        </div>
      </li>
    </ul>
    <div class="book__btn-holder">
      <a @click.prevent="state.popup = true"
         class="book__btn"
         href="#">+ Lend a new book away</a>
    </div>

    <div class="overlay" @click="lendBook($event)" :class="{ 'active' : state.popup }">
      <div class="popup">
        <div class="popup__title">Landing a book away</div>
        <div class="input-fields">
          <div class="input-fields__col input-fields__col--lg">
            <div class="input-holder">
              <input placeholder="Title of the book:" ref="title" type="text">
            </div>
            <div class="input-holder">
              <input placeholder="Lent to friend" ref="name" type="text">
            </div>
          </div>
          <div class="input-fields__col input-fields__col--sm">
            <div class="input-holder">
              <input placeholder="Name" ref="author" type="text">
            </div>
            <div class="input-holder">
              <vc-date-picker mode='range'
                              @input="input"
                              ref="date" value :input-props='{
                class: "input-date",
                placeholder: "Until:",
                readonly: true
              }'/>
            </div>
          </div>
        </div>
        <div v-show="state.editActive" class="checkbox">
          <label class="checkbox__label">
            <input type="checkbox" v-model="state.activeCheckbox">
            <span class="checkmark"></span>
            <span>Book has been returned back</span>
          </label>
        </div>
        <div class="popup__btn-w">
          <button @click="resetFields; state.popup = false; state.editActive=false"
                  class="popup__btn popup__btn--cancel">Cancel</button>
          <button @click="addBook" id="save-book" class="popup__btn">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Book from '../classes/Book';
import '../vendors/picker.min.css';
/* eslint-disable */
'use strict';
export default {
  name: 'Library',
  data() {
    return {
      order: '',
      books: [],
      state: {
        popup: false,
        editActive: false,
        activeIndex: undefined,
        activeCheckbox: false
      },
      range: {
        start: null,
        end: null,
      },
      pickedDate: '',
    };
  },
  methods: {
    lendBook($event) {
      if ($event.target.classList.contains('overlay')) this.state.popup = false;
    },
    addBook() {
      if(this.state.activeCheckbox) this.books.splice(this.state.activeIndex, 1); this.state.popup = false;
      if(this.state.editActive) return;

      const title = this.$refs.title.value;
      const date = this.changeDelimiters(this.$refs.date.inputValue);
      const name = this.$refs.name.value;
      const author = this.$refs.author.value;
      const book = new Book(title, date, name, author);
      if (this.validation) this.state.popup = false;
      if (this.validation && !this.state.editActive) this.books.push(book);
    },
    resetFields() {
      this.$refs.title.value = '';
      this.$refs.date.value_ = null;
      this.$refs.date.inputValue = '';
      this.$refs.name.value = '';
      this.$refs.author.value = '';
      this.state.activeIndex = null;
      this.state.activeCheckbox = false;
      this.state.editActive = false;
    },
    getBook(index) {
      this.state.activeIndex = index;
      this.$refs.title.value = this.books[index].title;
      this.$refs.date.inputValue = this.books[index].date;
      this.$refs.name.value = this.books[index].name;
      this.$refs.author.value = this.books[index].author;
      document.getElementById('save-book').addEventListener('click', () => {
        if (this.validation && !this.state.activeCheckbox) this.editBook(index);
      }, {once: true});
    },
    editBook(index) {
      console.log(index);
      this.books[index].title = this.$refs.title.value;
      this.books[index].date = this.changeDelimiters(this.$refs.date.inputValue);
      this.books[index].name = this.$refs.name.value;
      this.books[index].author = this.$refs.author.value;
      this.state.popup = false;
    },
    input() {
      this.pickerFilled = this.changeDelimiters(this.$refs.date.inputValue);
    },
    changeDelimiters(val) {
      return val.split('/').join('.');
    },
  },
  computed: {
    pickerFilled: {
      get: function () {
        return this.pickedDate = this.$refs.date.inputValue;
      },
      set: function (newValue) {
        this.pickedDate = newValue;
      }
    },
    validation() {
      return !!this.$refs.title.value.length && !!this.pickerFilled.length && !!this.$refs.name.value.length && !!this.$refs.author.value.length;
    },
  },
  watch: {
    'state.popup': function (val) {
      if (!val) setTimeout( () => this.resetFields(), 0);
    },
  },
};
</script>

<style lang="scss">
  $bgBase: #4a1880;
  $colorBase: #4a1880;
  $colorLink: #42b983;
  $colorSecondary: #666666;

  .book {
    display: flex;
    border: 1px solid #ccc;
    &__title {
      line-height: 1.8;
      color: $colorBase;
    }
    &__date {
      font-size: 14px;
      font-weight: bold;
      color: $colorSecondary;
    }
    &__description {
      flex-direction: column;
      align-items: flex-start;
      display: flex;
      font-weight: bold;
      padding: 40px 20px 40px;
      width: 65%;
    }
    &__order {
      width: 25px;
      background: $bgBase;
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
    }
    &__info {
      background: #c8c7de;
      padding: 40px 35px 25px;
      position: relative;
      width: calc(35% - 24px);
    }
    &__link {
      top: 5px;
      right: 5px;
      position: absolute;
      display: flex;
      padding: 10px 2px;
    }
    &__dots {
      width: 4px;
      height: 4px;
      background: #666666;
      display: inline-block;
      border-radius: 50%;
      box-shadow: 0px -6px 0 #666666, 0px 6px 0 #666666;
    }
    &__btn-holder {
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0;
      padding: 15px 0 10px;
      background: #ffffff;
      border-top: 2px solid #cccccc;
    }
    &__btn {
      color: $colorBase;
      font-weight: bold;
      text-decoration: none;
    }
    &__person {
      color: $colorBase;
      font-weight: 500;
      max-width: 110px;
      margin: 0 auto 15px;
    }
    & + & {
      margin-top: 15px;
    }
  }

  .popup {
    transform: translate3d(-50%, -50%, 0);
    background: #fff;
    max-width: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 100%;
    &__title {
      background: $bgBase;
      color: #ffffff;
      font-weight: bold;
      font-size: 18px;
      padding: 10px 0;
    }
    &__btn-w {
      padding: 10px;
      background: #cccccc7a;
    }
    &__btn {
      padding: 5px 21px 8px;
      background: none;
      font-size: 14px;
      min-width: 90px;
      border-radius: 5px;
      font-weight: bold;
      border: none;
      cursor: pointer;
      outline: none;
      transition: transform .3s ease-in-out;
      &:active {
        transition: transform .3s ease-in-out;
        transform: translate3d(0, 2px, 0);
      }
      & + & {
        margin-left: 20px;
        background: $bgBase;
        color: #ffffff;
      }
    }
  }

  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .25s;
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    content: "";
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    &.active {
      transition: opacity .25s;
      pointer-events: auto;
      visibility: visible;
      opacity: 1;
    }
  }

  .input-fields {
    padding: 30px 30px 20px;
    justify-content: space-between;
    display: flex;
    &__col {
      width: 50%;
      &--sm {
        width: 43%;
      }
      &--lg {
        width: 53%;
      }
    }
  }

  .input-holder {
    height: 40px;
    margin-bottom: 25px;
    input {
      width: 100%;
      height: 100%;
      border: none;
      padding: 8px 8px 8px 0;
      outline: none;
      border-bottom: 2px solid $bgBase;
      font-family: Arial, sans-serif;
      font-size: 14px;
      &::placeholder {
        font-weight: bold;
        font-style: italic;
      }
    }
  }

  .title {
    display: flex;
    padding-bottom: 10px;
    &__description {
      width: 65%;
      margin-left: 25px;
      color: $colorSecondary;
    }
    &__info {
      width: calc(35% - 24px);
      color: $colorBase;
    }
    &__description, &__info {
      font-style: italic;
      font-weight: 600;
    }
  }

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0;
}
a {
  color: #42b983;
}
.checkbox {
  color: $colorLink;
  padding: 0 30px 50px;
  font-weight: bold;
  display: flex;
}
</style>
