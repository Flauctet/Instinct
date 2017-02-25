//=============================================================================
// ResolutionChanger.js
//=============================================================================
 
/*:
 * @plugindesc Changing game resolution easily.
 * @author superrogin
 *
 * @param Width
 * @desc Width of the game screen.
 * @default 816
 *
 * @param Height
 * @desc Height of the game screen.
 * @default 624
 *
 * @help Ask superrogin@gmail.com
 */
 
/*:ko
 * @plugindesc ê²ì í´ìëë¥¼ ì½ê² ë°ê¿ ì ììµëë¤.
 * @author superrogin
 *
 * @param Width
 * @desc ê²ì ê°ë¡ í´ìë
 * @default 816
 *
 * @param Height
 * @desc ê²ì ì¸ë¡ í´ìë
 * @default 624
 *
 * @help ì§ë¬¸ : superrogin@gmail.com
 */
 
 
 
(function() {
 
    var parameters = PluginManager.parameters('ResolutionChanger');	
	var wdth = Number(parameters['Width'] || 816);
    var hght = Number(parameters['Height'] || 624);
	var _Scene_Base_create = Scene_Base.prototype.create;
 
	Scene_Base.prototype.create = function() {
		_Scene_Base_create.call(this);
		Graphics.width = wdth;
		Graphics.height = hght;	
	};
 
})();