var products = [];

function findProduct(productId) {
    return products[findProductKey(productId)];
}

function findProductKey(productId) {
    for (var key = 0; key < products.length; key++) {
        if (products[key].id == productId) {
            return key;
        }
    }
}

var productService = {
    findAll(fn) {
        axios
            .get('api/v1/products')
            .then(response => fn(response))
            .catch(error => console.log(error))
    },


    findById(id, fn) {
        axios
            .get('api/v1/products' + id)
            .then(response => fn(response))
            .catch(error => console.log(error))

    },
    create(product, fn) {
        axios
            .post('api/v1/products' + product)
            .then(response => fn(response))
            .catch(error => console.log(error))
    },


    update(id, product, fn) {
        axios
            .put('api/v1/products' + id, product)
            .then(response => fn(response))
            .catch(error => console.log(error))
    },

    deleteProducts(id, fn) {
        axios
            .delete('api/v1/products' + id)
            .then(response => fn(response))
            .catch(error => console.log(error))
    },

}

var List = Vue.extend({
    tempLate: '@product-list',
    data: function () {
        return {products: [], searchKey: ''};
    },
    computed: {
        filteredProduct() {
            return this.products.filter((product) => {
                return product.name.indexOf(this.searchKey) > -1
                    || product.description.indexOf(this.searchKey) > -1
                    || product.price.toString().indexOf(this.searchKey) > -1
            })
        }
    },
    mounted() {
        productService.findAll(r => {
            this.products = r.data;
            products = r.data
        })
    }
});
var Product = Vue.extend({
    template: '#product',
    data: function () {
        return {product: findProduct(this.$route.params.product_id)};
    }
});

var ProductEdit = Vue.extend({
    template: '#product-edit',
    data: function () {
        return {product: findProduct(this.$route.params.product_id)};
    },

    methods: {
        updateProduct: function () {
            productService.update(this.product.id, this.product, r => route.push('/'))
        }
    }
});

var ProductDelete = Vue.extend({
    template: '#product-delete',
    data: function () {
        return {product: findProduct(this.$route.params.product_id)};
    },
    methods: {
        deleteProduct: function () {
            productService.deleteProducts(this.product.id, r => route.push('/'))
        }
    }
});

var AddProduct = Vue.extend({
    template: '#add-product',
    data() {
        return {
            product: {name: '', description: '', price: 0}
        }
    },
    methods: {
        createProduct() {
            productService.create(this.product, r => route.push('/'))
        }
    }
});

var route = new VueRoute({
    route: [
        {path: '/', component: List},
        {path: '/product/:product_id', component: Product, name: 'product'},
        {path: '/add-product', component: AddProduct},
        {path: 'product/:product_id/edit', component: ProductEdit, name: 'product-edit'},
        {path: '/product/:product_id/delete', component: ProductDelete,name:'product-delete'},


    ]
});
new Vue({
    route
}).$mount('app')