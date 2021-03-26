// requirements for a native rendering function:
//
// - it must define a window.renderAd function that will be called by the Prebid Universal Creative
// - renderAd() must return a fully resolved and ready-to-display block of HTML that will be appended to the body
//
window.renderAd=function(data){
	let template = `
<style>
body {
  background-color: #FFFFFF;
  border: 1px solid #ddd;
  font-family: 'Roboto' , sans-serif;
  font-size: 12px;
  height: 48px;
  width: 318px;
  position: relative;
}

.attribution {
  background-color: #F74E41;
  border-radius: 2px;
  box-shadow: 0px 1px 2px rgba(0,0,0,.5);
  font-size: 11px;
  left: 4px;
  padding-left: 3px;
  padding-right: 3px;
  position: absolute;
  top: 4px;
  color: #FFFFFF;
}

.title {
  padding-top: 9px;
  padding-bottom: 4px;
  padding-right: 8px;
  font-family: PT Serif;
}

.title a {
  color: #000;
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
}

.image {
  float: left;
  width: 92px;
  padding-right: 6px;
}

.image img {
  height: 100%;
  width: 100%;
}

.image .image-link {
  width: 100%;
  height: 100%;
}

.call-to-action {
  float: right;
  padding-right: 8px;
}

.call-to-action a {
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
  color: #F74E41;
}

.advertiser {
  float: left;
}

.advertiser a {
  color: #222222;
  text-decoration: none;
  font-size: 10px;
  font-family: Roboto;
}
</style>

<div id='adunit' style='overflow: hidden;'>
  <div class='attribution'>Ad</div>
  <div class='image'>
    <a class='image-link pb-click' href='##hb_native_linkurl##' target='_blank'><img src='##hb_native_image##'></a>
  </div>
  <div class='title'>
    <a class='title-link pb-click' href='##hb_native_linkurl##' target='_blank'>##hb_native_title##</a>
  </div>
  <div class='advertiser'>
    <a class='advertiser-link pb-click' href='##hb_native_linkurl##' target='_blank'>##hb_native_brand##</a>
  </div>
  <div class='call-to-action'>
    <a class='call-to-action-link pb-click' href='##hb_native_linkurl##' target='_blank'>##hb_native_cta##</a>
  </div>
</div>
`;
	const map = {
	    title: 'hb_native_title',
	    body: 'hb_native_body',
	    body2: 'hb_native_body2',
	    privacyLink: 'hb_native_privacy',
	    sponsoredBy: 'hb_native_brand',
	    image: 'hb_native_image',
	    icon: 'hb_native_icon',
	    clickUrl: 'hb_native_linkurl',
	    displayUrl: 'hb_native_displayurl',
	    cta: 'hb_native_cta',
	    rating: 'hb_native_rating',
	    address: 'hb_native_address',
	    downloads: 'hb_native_downloads',
	    likes: 'hb_native_likes',
	    phone: 'hb_native_phone',
	    price: 'hb_native_price',
	    salePrice: 'hb_native_saleprice'
	}
	for (var i = 0; i < data.length; i++){
		if (map[data[i].key]) {
			template = template.replaceAll("##"+map[data[i].key]+"##",data[i].value);
		}
	}
	return template;
}