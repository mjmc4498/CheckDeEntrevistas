class Model {
    constructor() {
        this.interviews = JSON.parse(localStorage.getItem('interviews')) || [];
    }

    _commit(interviews) {
        localStorage.setItem('interviews', JSON.stringify(interviews));
    }

    addInterview(interviewData) {
        this.interviews.push(interviewData);
        this._commit(this.interviews);
    }

    getInterviews() {
        return this.interviews;
    }

    getLastInterview() {
        return this.interviews.length > 0 ? this.interviews[this.interviews.length - 1] : null;
    }

    getLevelCounts() {
        return this.interviews.reduce((acc, interview) => {
            acc[interview.suggestedLevel] = (acc[interview.suggestedLevel] || 0) + 1;
            return acc;
        }, {});
    }
}

export default Model;
