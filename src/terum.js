var db = require('./db');
const logger = require('./logger');

const terumObject = {
    'created_at': '2022-07-28 22:48:55.149891',
    'updated_at': '2022-07-28 22:48:59.324017',
    'explanation': 'SF hike to Coit Tower',
    'audience': 'everyone',
    'goal': 'share_knowledge',
    'description': 'San Francisco’s Coit Tower hike is a beautiful one with stairs through secret gardens of the city!',
    'user_id': 6 ,  
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
    'inviteToFollowers': '0',
    'start_date': '2022-09-01 07:00:00.000000',
    'end_date': '2023-10-06 07:00:00.000000',
}

const insert = async (connection, index, type) => { 
    let explanation = 'LOAD_'+index+'_'+terumObject.explanation;
    let sqlQuery = "INSERT INTO `terum`.`social_terum` (`created_at`, `updated_at`, `explanation`, `audience`, `goal`, `description`, `user_id`, `status`, `expired_at`, `start_latitude`, `start_longitude`, `target_latitude`, `target_longitude`, `created`, `points`, `shares`, `five_day_notification_sent`, `activist_goal`, `is_goal_reached`, `popularity`, `inviteToFollowers`,`start_date`, `end_date`) VALUES ('"+terumObject.created_at+"','"+terumObject.updated_at+"', '"+explanation+"', '"+terumObject.audience+"', '"+type+"', '"+terumObject.description+"', "+terumObject.user_id+", '"+terumObject.status+"', '"+terumObject.expired_at+"',"+terumObject.start_latitude+", "+terumObject.start_longitude+", "+terumObject.target_latitude+", "+terumObject.target_longitude+", '"+terumObject.created+"', '"+terumObject.points+"', '"+terumObject.shares+"', '"+terumObject.five_day_notification_sent+"', '"+terumObject.activist_goal+"', '"+terumObject.is_goal_reached+"', '"+terumObject.popularity+"', '"+terumObject.inviteToFollowers+"', '"+terumObject.start_date+"', '"+terumObject.end_date+"')";
    try {
        console.log('before insert', index);
        let results = await connection.query(sqlQuery);
        if(results[0]?.insertId){
            
            //Add new media ie upload a single image
            let image = '1659349234973.jpg';
            if(type == 'challenge_others') {
                image = '1659355682951.PNG';
            }

            sqlQuery = "INSERT INTO social_media (`created_at`, `updated_at`, `file`, `media_type`, `description`, `user_id`, `thumbnail`, `thumbnail_created`) VALUES ('2022-07-29 09:46:09.647584', '2022-07-29 09:46:09.647628', '"+image+"', 'image', 'challenge-images', '1', '', '0')"
            let uploadResult = await connection.query(sqlQuery);
            
            //Link that image to terum
            sqlQuery = `INSERT INTO social_terum_medias (terum_id, media_id) VALUES (${results[0].insertId}, ${uploadResult[0].insertId})`
            await connection.query(sqlQuery);

            //Link that category to terum
            sqlQuery = `INSERT INTO social_terum_categories (terum_id, category_id) VALUES (${results[0].insertId}, '3')`
            await connection.query(sqlQuery);
        }
       

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
        await insert(connection, index, 'share_knowledge');
    }
    for(let index=0; index<count; index++) {
        await insert(connection, index, 'challenge_others');
    }
}

module.exports = {
    createTerum: createTerum
}

