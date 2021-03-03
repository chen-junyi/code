// 寄生组合继承

function Parent() {
    this.name = 'parent';
}

function Child() {
    Parent.call(this);
    this.type = 'children';
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
