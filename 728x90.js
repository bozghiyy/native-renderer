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
  font-family: 'Arial';
  font-size: 12px;
  height: 88px;
  position: relative;
  width: 726px;
}

.attribution {
  background-color: #FFFFFF;
  border-radius: 2px;
  box-shadow: 0px 1px 2px rgba(0,0,0,.5);
  font-size: 11px;
  left: 4px;
  padding-right: 3px;
  padding-left: 3px;
  position: absolute;
  top: 4px;
  color: #212121;
}

.title {
  padding-right: 30px;
  padding-top: 17px;
}

.title a {
  color: #212121;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.4;
  text-decoration: none;
     color: #111111;

}

.image {
  float: left;
  padding-right: 14px;
  width: 168px;
}

.image img {
  height: 100%;
  width: 100%;
}

.image .image-link {
  height: 100%;
  width: 100%;
}

.call-to-action {
  border-left: 1px solid #ddd;
  float: right;
  padding-bottom: 34px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 38px;
}

.call-to-action a {
  color: #84C88D;
  font-size: 17px;
  font-weight: 700;
  text-decoration: none;
}

.logo {
  float: left;
  padding-top: 5px;
  padding-right: 10px;
  width: 23px;
}

.logo img {
  display: flex;
  height: 100%;
  width: 100%;
}

.logo .logo-link {
  height: 100%;
  width: 100%;
}

.advertiser {
  padding-top: 10px;
}

.advertiser a {
  color: #242424;
  font-size: 14px;
  font-weight: Bold;
  text-decoration: none;
}
</style>

<div id='adunit' style='overflow: hidden;'>
  <div class='attribution'>Ad</div>
  <div class='image'>
    <a class='image-link pb-click' href='##hb_native_linkurl##' target='_blank'><img src='##hb_native_image##'></a>
  </div>
  <div class='call-to-action'>
    <a class='call-to-action-link pb-click' href='##hb_native_linkurl##' target='_blank'>##hb_native_cta##</a>
  </div>
  <div class='title'>
    <a class='title-link pb-click' href='##hb_native_linkurl##' target='_blank'>##hb_native_title##</a>
  </div>
  <div class='logo'>
    <a class='logo-link pb-click' href='##hb_native_linkurl##' target='_blank'><img src='##hb_native_icon##'></a>
  </div>
  <div class='advertiser'>
    <a class='advertiser-link pb-click' href='##hb_native_linkurl##' target='_blank'>##hb_native_brand##</a>
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