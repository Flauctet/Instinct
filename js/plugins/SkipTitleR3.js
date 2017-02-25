/*:
 * @plugindesc Plugin creer pour R3DSKY, par R3DSKY
 * Created with the help of SumRndmDde
 *
 * @author R3DSKY
 *
 * @help Added after !
 *
 */
Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        // SceneManager.goto(Scene_Title);
        // Window_TitleCommand.initCommandPosition();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
    }
    this.updateDocumentTitle();
}
