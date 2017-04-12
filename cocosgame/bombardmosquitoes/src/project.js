require=function t(e,o,n){function c(i,a){if(!o[i]){if(!e[i]){var l="function"==typeof require&&require;if(!a&&l)return l(i,!0);if(s)return s(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var r=o[i]={exports:{}};e[i][0].call(r.exports,function(t){var o=e[i][1][t];return c(o?o:t)},r,r.exports,t,e,o,n)}return o[i].exports}for(var s="function"==typeof require&&require,i=0;i<n.length;i++)c(n[i]);return c}({bullet:[function(t,e,o){"use strict";cc._RFpush(e,"9b2b98ozPdBOrh4fCj6saZd","bullet"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},onCollisionEnter:function(t,e){var o=this.weapon.genBoomNode();o.setPosition(this.node.getPosition()),this.node.parent.addChild(o),e.node.stopAllActions(),e.node.runAction(cc.hide()),e.node.active=!1,this.weapon.putBulletNode(this.node)},update:function(t){}}),cc._RFpop()},{}],common:[function(t,e,o){"use strict";cc._RFpush(e,"89b90QwKqVG0LcICLL05Raj","common");cc.Class({"extends":cc.Component,properties:{},onLoad:function(){D.common=this},genNodePool:function(t,e){for(var o=e,n=new cc.NodePool,c=0;c<o;++c){var s=cc.instantiate(t);n.put(s)}return n},genNewNode:function(t,e,o){var n=null;return n=t.size()>0?t.get():cc.instantiate(e),o.addChild(n),n}});cc._RFpop()},{}],game:[function(t,e,o){"use strict";cc._RFpush(e,"4db6aDnPvlI17ZNagLjK8GX","game"),cc.Class({"extends":cc.Component,properties:{sceneNode:cc.Node,mosquitoPrefab:cc.Prefab},onLoad:function(){var t=cc.director.getCollisionManager();t.enabled=!0,this.mosquitoPool=D.common.genNodePool(this.mosquitoPrefab,5),this.startSpawnMosquitoes(),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onKeyDown:function(t){switch(t.keyCode){case cc.KEY.s:}},onKeyUp:function(t){switch(t.keyCode){case cc.KEY.s:}},spawnMosquito:function(){var t=D.common.genNewNode(this.mosquitoPool,this.mosquitoPrefab,this.sceneNode);t.getComponent("mosquito").game=this;var e=400*cc.randomMinus1To1();t.setPosition(cc.p(e,350));var o=20*cc.randomMinus1To1(),n=30*cc.randomMinus1To1()+70,c=this,s=cc.sequence(cc.moveTo(700/n,o,-500),cc.callFunc(function(){t.stopAllActions(),c.destroyMosquito(t)}));t.runAction(s)},startSpawnMosquitoes:function(){var t=1.5;this.schedule(function(){this.spawnMosquito()},t)},destroyMosquito:function(t){this.mosquitoPool.put(t)}}),cc._RFpop()},{}],global:[function(t,e,o){"use strict";cc._RFpush(e,"497acL4sGRFWryvpBNtA0Fj","global"),window.D={common:null},cc._RFpop()},{}],handler:[function(t,e,o){"use strict";cc._RFpush(e,"f0210SZYb9J2I6+xSUKErzu","handler"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){this.touchID=-1,this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this),this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchMove,this),this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this)},onTouchMove:function(t){console.log("("+t.getLocationX()+","+t.getLocationY()+")");var e=this.touchID===-1,o=this.touchID!==-1&&this.touchID===t.getID();if(e&&(this.touchID=t.getID()),e||o){var n=this.node.convertToNodeSpaceAR(t.getLocation()),c=this.node.parent.getChildByName("weapon").getComponent("weapon");n.x<0?c.rotateLeft():n.x>0&&c.rotateRight()}},onTouchEnd:function(t){if(this.touchID!==-1){this.touchID=-1;var e=this.node.parent.getChildByName("weapon").getComponent("weapon");e.stopRotate()}}}),cc._RFpop()},{}],mosquito:[function(t,e,o){"use strict";cc._RFpush(e,"ec6c3LOaEhMbqR2lYeiuVCm","mosquito"),cc.Class({"extends":cc.Component,properties:{game:{"default":null,type:cc.Component,visible:!1}},onLoad:function(){},onCollisionEnter:function(t,e){e.node.stopAllActions(),this.game.destroyMosquito(e.node)},needDestroy:function(t){}}),cc._RFpop()},{}],shot:[function(t,e,o){"use strict";cc._RFpush(e,"56ab5+oZOlFGLPoDk0cAEOx","shot"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},onClicked:function(){var t=this.node.parent.getChildByName("weapon").getComponent("weapon");t.shot()}}),cc._RFpop()},{}],weapon:[function(t,e,o){"use strict";cc._RFpush(e,"c1ab8+YX3VNRJXQJ+eYWEaf","weapon"),cc.Class({"extends":cc.Component,properties:{head:cc.Node,bulletSpeed:200,speedDelta:.1,minAngle:-80,maxAngle:80,minBulletInterval:.5,bulletPrefab:cc.Prefab,boomPrefab:cc.Prefab},onLoad:function(){this.speed=0,this.lastValidKey=cc.KEY.none,this.bulletPool=D.common.genNodePool(this.bulletPrefab,10),this.lastBulletTimeInterval=this.minBulletInterval+1,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},rotateLeft:function(){this.speed=-this.speedDelta},rotateRight:function(){this.speed=this.speedDelta},stopRotate:function(){this.speed=0},onKeyDown:function(t){switch(t.keyCode){case cc.KEY.space:this.shot();break;case cc.KEY.a:case cc.KEY.left:this.rotateLeft(),this.lastValidKey=t.keyCode;break;case cc.KEY.d:case cc.KEY.right:this.rotateRight(),this.lastValidKey=t.keyCode}},onKeyUp:function(t){switch(t.keyCode){case cc.KEY.a:case cc.KEY.left:case cc.KEY.d:case cc.KEY.right:if(this.lastValidKey!==t.keyCode)return;this.stopRotate(),this.lastValidKey=cc.KEY.none}},shot:function(){if(console.log(this.lastBulletTimeInterval+"-"+this.minBulletInterval),this.lastBulletTimeInterval>this.minBulletInterval){this.lastBulletTimeInterval=0;var t=this.node.convertToWorldSpaceAR(this.head.getPosition()),e=this.node.parent.convertToNodeSpaceAR(t),o=D.common.genNewNode(this.bulletPool,this.bulletPrefab,this.node.parent);o.getComponent("bullet").weapon=this,o.active=!0,o.runAction(cc.show()),o.setPosition(e);var n=520,c=700,s=Math.sqrt(n*n+c*c),i=cc.pSub(e,this.node.getPosition()),a=s/cc.pLength(i),l=cc.pMult(i,a),u=this;o.runAction(cc.sequence(cc.moveBy(1.5,l),cc.callFunc(function(){u.bulletPool.put(o)})));var r=cc.pNormalize(i),h=cc.moveBy(.1,cc.pMult(r,-10)),p=cc.moveBy(.15,cc.pMult(r,10));this.node.runAction(cc.sequence(h,p))}},update:function(t){this.lastBulletTimeInterval+=t,this.lastBulletTimeInterval>this.minBulletInterval&&(this.lastBulletTimeInterval=this.minBulletInterval+.1);var e=this.node,o=e.rotation;e.rotation=Math.min(this.maxAngle,Math.max(this.minAngle,this.speed+o))},genBoomNode:function(){return cc.instantiate(this.boomPrefab)},putBulletNode:function(t){this.bulletPool.put(t)}}),cc._RFpop()},{}]},{},["bullet","common","game","global","handler","mosquito","shot","weapon"]);