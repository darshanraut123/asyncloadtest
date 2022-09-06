var db = require('./db');
const logger = require('./logger');

const terumObject = {
    'created_at': '2022-07-28 22:48:55.149891',
    'updated_at': '2022-07-28 22:48:59.324017',
    'explanation': 'SF hike to Coit Tower',
    'audience': 'everyone',
    'goal': 'share_knowledge',
    'description': 'San Francisco’s Coit Tower hike is a beautiful one with stairs through secret gardens of the city!',
    'user_id': 37 ,  
    'status': 'ACTIVE',
    'expired_at': '2022-08-27 22:48:55.149519',
    'start_latitude': '23.3635810000',
    'start_longitude': '23.3635810000',
    'target_latitude': '23.3635810000',
    'target_longitude': '23.3635810000',
    'created': '0',
    'points': '0',
    'shares': '1',
    'five_day_notification_sent': '0',
    'activist_goal': 'activist_50',
    'is_goal_reached': '0',
    'popularity': '10',
    'inviteToFollowers': '0'
}

const insert = async (connection, index) => { 
    let explanation = 'LOAD_'+index+'_'+terumObject.explanation;
    let sqlQuery = "INSERT INTO `terum`.`social_terum` (`created_at`, `updated_at`, `explanation`, `audience`, `goal`, `description`, `user_id`, `status`, `expired_at`, `start_latitude`, `start_longitude`, `target_latitude`, `target_longitude`, `created`, `points`, `shares`, `five_day_notification_sent`, `activist_goal`, `is_goal_reached`, `popularity`, `inviteToFollowers`) VALUES ('"+terumObject.created_at+"','"+terumObject.updated_at+"', '"+explanation+"', '"+terumObject.audience+"', '"+terumObject.goal+"', '"+terumObject.description+"', "+terumObject.user_id+", '"+terumObject.status+"', '"+terumObject.expired_at+"',"+terumObject.start_latitude+", "+terumObject.start_longitude+", "+terumObject.target_latitude+", "+terumObject.target_longitude+", '"+terumObject.created+"', '"+terumObject.points+"', '"+terumObject.shares+"', '"+terumObject.five_day_notification_sent+"', '"+terumObject.activist_goal+"', '"+terumObject.is_goal_reached+"', '"+terumObject.popularity+"', '"+terumObject.inviteToFollowers+"')";
    try {
        console.log('before insert', index);
        let results = await connection.query(sqlQuery);
        console.log('after insert', index);
        logger.log(results);
    } catch (err) {
        if(err){
            logger.log(err);
        }
    }
}

const createTerum = async (count) => {
    const connection = await db.getConnection();
    for(let index=0; index<count; index++) {
        await insert(connection, index);
    }
}

module.exports = {
    createTerum: createTerum
}

