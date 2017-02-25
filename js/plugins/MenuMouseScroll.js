//=============================================================================
// MenuMouseScroll.js
//=============================================================================

/*:
 * @plugindesc Enable mouse wheel and touch swipe to scroll through party members in main menu.
 * including the Skill, Equip, and Status screens
 * @author Amuseum
 *
 * @param Move Threshold
 * @desc Threshold for scrolling and swiping.
 * Default 10
 * @default 10
 *
 * @help 
 * Go to the main menu -> Skill, Equip, or Status screen.
 * Change party members with one of the following methods:
 * 1) Scroll mouse wheel up for previous party member; scroll down for next member.
 * 2) Swipe with mouse drag or tablet swipe. Swipe up or left for previous member; 
 *    swipe down or right for next member.
 *
 * This plugin does not provide plugin commands.
 */

(function() {

	var parameters = PluginManager.parameters('MenuMouseScroll');
	var moveThreshold = Number(parameters['Move Threshold']);
	
	var scrollThroughActor = function() {
		if (this.isOpen()) {
			var threshold = moveThreshold;
			if (TouchInput.wheelY >= threshold) {
				SceneManager._scene.nextActor();
			}
			else if (TouchInput.wheelY <= -threshold) {
				SceneManager._scene.previousActor();
			}
		}
	};
	
	var oldProcessTouch = Window_Selectable.prototype.processTouch;
	swipeThroughActor = function() {
		if (this.isOpen()) {
			if (TouchInput.isTriggered()) {
				TouchInput._startX = TouchInput._x;
				TouchInput._startY = TouchInput._y;
			}

			if (TouchInput.isMoved() && TouchInput.isReleased()) {
				this._touching = false;

				var threshold = moveThreshold;
				var deltaX = TouchInput._x - TouchInput._startX;
				var deltaY = TouchInput._y - TouchInput._startY;
				if (deltaY >= threshold) {
					SceneManager._scene.nextActor();
				}
				else if (deltaY <= -threshold) {
					SceneManager._scene.previousActor();
				}
				else if (deltaX >= threshold) {
					SceneManager._scene.nextActor();
				}
				else if (deltaX <= -threshold) {
					SceneManager._scene.previousActor();
				}
			}
		}
		oldProcessTouch.call(this);
	}
	
	Window_SkillType.prototype.processWheel = scrollThroughActor;
	Window_EquipCommand.prototype.processWheel = scrollThroughActor;		
	Window_Status.prototype.processWheel = scrollThroughActor;
	
	Window_SkillType.prototype.processTouch = swipeThroughActor;
	Window_EquipCommand.prototype.processTouch = swipeThroughActor;		
	Window_Status.prototype.processTouch = swipeThroughActor;

})();
