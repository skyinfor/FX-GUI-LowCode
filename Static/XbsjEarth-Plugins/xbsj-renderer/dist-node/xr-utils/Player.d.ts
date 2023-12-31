import { Destroyable } from "./Destroyable";
import { Event } from "./pipe";
import { StartUpdateFuncType } from "./StartUpdateFunc";
export declare class Player extends Destroyable {
    private _speed;
    private _speedChangedEvent?;
    private _duration;
    private _durationChangedEvent?;
    private _loop;
    startUpdateFunc: StartUpdateFuncType;
    private _updateBindThis;
    private _cancelStartUpdateFunc?;
    private _startTimeStamp;
    private __currentTime;
    private _playingChangedEvent?;
    private _startPlayingEvent?;
    private _stopPlayingEvent?;
    private _currentTimeChangedEvent?;
    private _loopChangedEvent?;
    constructor(duration?: number, startUpdateFunc?: StartUpdateFuncType);
    get startPlayingEvent(): Event<[number]>;
    get stopPlayingEvent(): Event<[number]>;
    get currentTimeChangedEvent(): Event<[number, number]>;
    get loopChangedEvent(): Event<[boolean]>;
    set loop(value: boolean);
    get loop(): boolean;
    private _update;
    private get _currentTime();
    private set _currentTime(value);
    get currentTime(): number;
    set currentTime(value: number);
    get durationChangedEvent(): Event<[number, number]>;
    get duration(): number;
    set duration(value: number);
    get speedChangedEvent(): Event<[number, number]>;
    get speed(): number;
    set speed(value: number);
    private _startPlaying;
    private _stopPlaying;
    get playingChangedEvent(): Event<[boolean]>;
    get playing(): boolean;
    set playing(value: boolean);
}
