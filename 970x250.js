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
  height: 248px;
  position: relative;
  width: 968px;
}

.attribution {
  background-color: #F74E41;
  border-radius: 2px;
  box-shadow: 0px 1px 2px rgba(0,0,0,.5);
  font-size: 16px;
  left: 4px;
  padding-left: 3px;
  padding-right: 3px;
  position: absolute;
  top: 4px;
  color: #FFFFFF;
}

.title {
  display: table-cell;
  height: 99px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-top: 15px;
  vertical-align: middle;
  font-family: PT Serif;
}

.title a {
  color: #222222;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  text-decoration: none;
}

.body {
  border-bottom: 1px solid #ddd;
  display: block;
  height: 39px;
  padding-bottom: 20px;
  padding-right: 20px;
  vertical-align: bottom;
  font-family: Roboto;
}

.body a {
  color: #222222;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  text-decoration: none;
}

.image {
  float: left;
  padding-right: 25px;
  width: 474px;
}

.image img {
  height: 100%;
  width: 100%;
}

.image .image-link {
  background-color: #fff;
  height: 100%;
  width: 100%;
}

.call-to-action {
  float: right;
  padding-right: 20px;
  padding-top: 23px;
  text-align: right;
}

.call-to-action a {
  color: #F74E41;
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
}

.logo {
  float: left;
  height: 39px;
  padding-right: 15px;
  padding-top: 13px;
  width: 39px;
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
  float: left;
  padding-top: 22px;
}

.advertiser a {
  color: #222222;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
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
  <div class='body'>
    <a class='title-link pb-click' href='##hb_native_linkurl##' target='_blank'>##hb_native_body##</a>
  </div>
  <div class='logo'>
    <a class='logo-link pb-click' href='##hb_native_linkurl##' target='_blank'><img src='##hb_native_icon##'></a>
  </div>
  <div class='advertiser'>
    <a class='advertiser-link pb-click' href='##hb_native_linkurl##' target='_blank'>##hb_native_brand##</a>
  </div>
  <div class='call-to-action'>
    <a class='call-to-action-link pb-click' href='##hb_native_linkurl##' target='_blank'>##hb_native_cta##</a>
  </div>
</div>
`;

// Map values
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

// Put all existing keys in an array
var dataKeys = [];
for (var i = 0; i < data.length; i++){
  dataKeys.push(data[i].key)
}

// If some values are missing, put some defaults
if(dataKeys.indexOf("title") < 0){
  data.push({key: "title", value: "Learn more!"})
}

if(dataKeys.indexOf("body") < 0){
  data.push({key: "body", value: ""})
}

if(dataKeys.indexOf("body2") < 0){
  data.push({key: "body2", value: ""})
}

if(dataKeys.indexOf("privacyLink") < 0){
  data.push({key: "privacyLink", value: "#"})
}

if(dataKeys.indexOf("sponsoredBy") < 0){
  data.push({key: "sponsoredBy", value: "Learn more!"})
}

if(dataKeys.indexOf("image") < 0){
  data.push({key: "image", value: "https://cdn.jsdelivr.net/gh/bozghiyy/native-renderer@latest/w.png"})
}

if(dataKeys.indexOf("icon") < 0){
  data.push({key: "icon", value: "https://cdn.jsdelivr.net/gh/bozghiyy/native-renderer@latest/w.png"})
}

if(dataKeys.indexOf("clickUrl") < 0){
  data.push({key: "clickUrl", value: "#"})
}

if(dataKeys.indexOf("displayUrl") < 0){
  data.push({key: "displayUrl", value: "Learn more!"})
}

if(dataKeys.indexOf("cta") < 0){
  data.push({key: "cta", value: "Learn more!"})
}

if(dataKeys.indexOf("rating") < 0){
  data.push({key: "rating", value: ""})
}

if(dataKeys.indexOf("address") < 0){
  data.push({key: "address", value: ""})
}

if(dataKeys.indexOf("downloads") < 0){
  data.push({key: "downloads", value: ""})
}

if(dataKeys.indexOf("likes") < 0){
  data.push({key: "likes", value: ""})
}

if(dataKeys.indexOf("phone") < 0){
  data.push({key: "phone", value: ""})
}

if(dataKeys.indexOf("price") < 0){
  data.push({key: "price", value: ""})
}

if(dataKeys.indexOf("salePrice") < 0){
  data.push({key: "salePrice", value: ""})
}

// Make the replacements
for (var i = 0; i < data.length; i++){
    if (map[data[i].key]) {
      template = template.replaceAll("##"+map[data[i].key]+"##",data[i].value);
    }
}

// Return template
return template;
}