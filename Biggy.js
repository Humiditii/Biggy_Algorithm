
const mock_user = [
    {
        uuid: '4816221489163952hameed@gmail.com',
        firstname: 'Hameed',
        lastname: 'Babatunde',
        mobile_number: '08033799510',
        email: 'hameed@gmail.com'
    },
    {
        uuid: '4816221489163952hameed@gmail.com',
        firstname: 'Hameed',
        lastname: 'Babatunde',
        mobile_number: '08033799510',
        email: 'hameed@gmail.com'
    },
    {
        uuid: '4816221489163952hameed@gmail.com',
        firstname: 'Hameed',
        lastname: 'Babatunde',
        mobile_number: '08033799510',
        email: 'hameed@gmail.com'
    }
]

const mock_competitor_schema = [
    {
        id: '45790571835704683meed@gmail.com',
        post: [ 'onsignup', 'onsignup','onsignup','onsignup' ],
        counts: 4
    },
    {
        id: '45788571830104683ham@gmail.com',
        post: [ 'onsignup', 'onsignup', 'onsignup' ],
        counts: 3
    },
    {
        id: '66788571835704683haed@gmail.com',
        post: [ 'onsignup' ],
        counts: 1
    }
]


class Biggy{
    static signup(f_name, l_name, number, email, ref_id=null){
        
        if(!ref_id){
            const new_user = {
                uuid:Math.random().toString().split('.')[1] +email,
                firstname: f_name,
                lastname: l_name,
                mobile_number: number,
                email: email
            }

            const auto_entry = this.competition_entry(new_user.uuid,'onsignup')
            return {
                user: new_user,
                unique_ref_link_id: new_user.uuid, // referral unique link id is same as the uuid of the referrer
                competition: auto_entry,
                statusCode: 201
            }
        }else{
            // find user with that id and increase his entries
            const find_user = mock_user.find( user => user.uuid == ref_id )
            if(find_user){
                // increase his entries in the database
                const referral_bonus = this.competition_entry(find_user.uuid,'referral bonus')
                const updated_referrer = referral_bonus ? true : false // check if the referrer entry has been updated
                const new_user = {
                    uuid:Math.random().toString().split('.')[1] +email,
                    firstname: f_name,
                    lastname: l_name,
                    mobile_number: number,
                    email: email
                }
    
                const auto_entry = this.competition_entry(new_user.uuid,'onsignup')
                return {
                    user: new_user,
                    unique_ref_link_id: new_user.uuid, // referral unique link id is same as the uuid of the referrer
                    competition: auto_entry,
                    ref_update: updated_referrer,
                    statusCode: 201
                }

            }else{
                return {
                    message: 'Referrer could not be found',
                    statusCode: 404
                }
            }
        }
    }

    static competition_entry(uuid, post, oldPost){
        // mocking fetching old posts from the database
        const fetch_old_post_by_user =  typeof oldPost == "object" ? [...oldPost] : []
        //updating the posts
        fetch_old_post_by_user.unshift(post)
        const new_post = [...fetch_old_post_by_user]
        const user_entries = {
            id: uuid,
            post: new_post,
            counts: new_post.length
        }
        // posts
        return user_entries
    }

    static get_winner(){
        // mocking fetching the competitors
        const fetch_all_competitors = mock_competitor_schema
        const array = []
        const users_id = []
        for (const key in fetch_all_competitors) {
            console.log(key)
            array.push(fetch_all_competitors[key].counts)
            users_id.push(fetch_all_competitors[key].id)
            
        }
        let largest= 0;
            let win_id

            console.log(array, users_id)
            // finding the user with the maximum posts
            for (let i=0; i<=largest;i++){
                if (array[i]>largest) {
                    largest=array[i]
                    win_id = i
                }
            }
            return {
                winner: {
                    id: users_id[win_id],
                    counts: largest, 
                    statusCode: 200
                }
            }
    }
}





//console.log(Biggy.signup('Hameed', 'Babatunde', '08033799510', 'hameed@gmail.com'))
// console.log(Biggy.get_winner())
//console.log(Biggy.competition_entry('5140923064496459hameed@gmail.com', 'cool product',['onsignup', 'nice drink'])) // with old product
//console.log(Biggy.competition_entry('5140923064496459hameed@gmail.com', 'cool product',['onsignup'])) // on signup
