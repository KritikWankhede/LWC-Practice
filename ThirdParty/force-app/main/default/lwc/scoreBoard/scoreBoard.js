import { LightningElement, api } from 'lwc';

export default class ScoreBoard extends LightningElement {
    @api currentScore;
    @api highScore;
}