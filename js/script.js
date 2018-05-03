$(function(){
  checkboxes.click(function(){
    createQueryHash(filters);
  }); 
  
  $.getJSON("products.json", function(data) {
    generateAllProductsHTML(data);
    $(window).trigger('hashchange');
  });
  
  $(window).on('hashchange', function(){
    render(decodeURI(window.location.hash));
  });
  
  function render(url){
    var temp = url.split('/')[0];
    $('.main-content .page').removeClass('visible');
    
    var map = {
      '': function(){
        filters = {};
        checkboxes.prop('checked', false);
        
        renderProductsPage(products);
      },
      '#filter': function(){
        url = url.split('#filter/')[1].trim();
        
        try {
          filters = JSON.parse(url);
        }
        catch(err) {
          window.location.hash = '#';
        }
        
        renderFilterResults(filters, products);
      }
      
    };
    if(map[temp]){
       map[temp]();
       }
       else {
        renderErrorPage();
       }
  }
  
  function generateALLProductsHTML(data){
    var list = $('.all-products .products-list');
    var theTemplateScript = $('#products-template').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    list.append(theTemplate(data));
    list.find('li').on('click', function(e){
      e.preventDefault();
    
      var productIndex = $(this).data('index');
      
      window.location.hash = 'product/' + productIndex;
    })
  }
  
  function renderProductsPage(data){
    var page = $('.all-products'),
      allProducts = $('.all-products .product-list > li');
    
    allProducts.addClass('hidden');
    
    allProducts.each(function(){
      var that = $(this);
      
      data.forEach(function(item){
        if (that.data('index') == item.id){
          that.removeClass('hidden');
        }
      });
    });
    page.addClass('visible');
  }
  
  function renderSingleProductsPage(index, data){
    var page = $('.single-product'),  
        container = $('.preview-large');
    
    if(data.length){
       data.forEach(function(item){
         if(item.id == index){
           container.find('h3').text(item.name);
           container.find('img').attr('src', item.image.large);
           container.find('p').text(item.description);
         }
       });
    }
      page.addClass('visible');
  }
  
  function renderFilterResults(filters, products){
    var criteria = ['manufacturer', 'storage', 'os', 'camera' ],
        results = [],
        isFiltered = false; 
    
    checkboxes.prop('checked', false);
    citeria.forEach(function(c){
      if()
    });
    
    renderProductsPage(results);
  }
                    
  function renderErrorPage(){
      var page = $('.error');
      page.addClass('visible');
    }
    
  function createQueryHash(filters){
    if(!$.isEmptyObject(filters)){
       window.location.hash = '#/filter' + JSON.stringify(filters);
       }
    else{
      window.location.hash = '#';
    }
  }
  
});