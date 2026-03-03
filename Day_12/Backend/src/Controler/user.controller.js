let followmodal = require("../Modals/follows.modal")
let usermodal = require("../Modals/user.modal")
// let postmodal = require("../Modals/post.model")
// let Imagekit = require("@imagekit/nodejs")
// let { toFile } = require("@imagekit/nodejs")
let { ImageKit } = require("@imagekit/nodejs")
let { toFile } = require("@imagekit/nodejs")

let imagekit = new ImageKit({
    privateKey: process.env.PRIVATE_IMAGE_KIT
})

let follow = async (req, res) => {
    let followusername = req.user.username
    let followeusername = req.params.username
    let { action } = req.body
    console.log(action)

    if (followeusername === followusername) {
        return res.status(404).json({
            message: "You cannot Follow Yourself"
        })
    }
    /**
     * Default behavior me object ke andar multiple fields ka matlab hota hai AND condition, OR nahi.
     * jo queery me niche likhi he  Dono match hone chahiye. DB me 
     */
    let existing = await followmodal.findOne({
        follower: followusername,
        followe: followeusername
    })

    /**
     *  Agar record exist karta hai
     */

    if (existing) {

        if (action == "accepted" || action == "rejected") {

            if (existing.status !== "pending") {
                return res.json({
                    message: `Already ${existing.status}`
                })
            }

            //Databse me save kro status ko

            existing.status = action
            await existing.save()
            // or res send kr do
            return res.json({
                message: `Request ${action}`,
                data: existing
            })
        }

        //agar user ne kuch bhi nhi bheja status to bydefault pending show krega

        return res.json({
            message: `Already ${existing.status}`
        })
    }


    /**
     * agar record exist nahi karta  naya pending request create karo
     */

    let userexist = await usermodal.findOne({ username: followeusername })

    if (!userexist) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    let followrecord = await followmodal.create({
        follower: followusername,
        followe: followeusername,
        status: "pending"
    })

    res.status(201).json({
        message: `Follow request send ${userexist.username}`,
        followrecord
    })

}


let unfollow = async (req, res) => {
    let followusername = req.user.username
    let followeusername = req.params.username


    let isuserfollowing = await followmodal.findOne(
        {
            follower: followusername,
            followe: followeusername
        }
    )

    if (!isuserfollowing) {
        return res.status(404).json({
            message: `You are not following  ${followeusername}`
        })
    }

    await followmodal.findByIdAndDelete(isuserfollowing._id)

    res.status(200).json({
        message: `You have unfollowed..${followeusername}`,
        status: "Rejected"
    })
}

let getMyProfile = async (req, res) => {
    let userId = req.user.id
    let followersCount = await FollowModel.countDocuments({
        following: userId
    })

    let followingCount = await FollowModel.countDocuments({
        follower: userId
    })
    let user = await usermodal.findById({ _id: userId }).select("-email")

    res.status(200).json({
        user,
        follows: {
            followersCount,
            followingCount
        }
    });
}

let updateMyProfile = async (req, res) => {

    let { bio, username } = req.body;

    let updateData = { bio, username };

    if (req.file) {
        let uploadedImage = await imagekit.files.upload({
            file: await toFile(req.file.buffer, "profile"),
            fileName: `profile-${req.user.id}`,
            folder: "cohort-2-insta-clone-profiles"
        });

        updateData.profile = uploadedImage.url; // 👈 Important
    }

    let updatedUser = await usermodal.findByIdAndUpdate(
        req.user.id,
        updateData,
        { returnDocument: 'after', runValidators: true }
    ).select("-password");



    res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
    });


};

module.exports = {
    follow,
    unfollow,
    getMyProfile,
    updateMyProfile
}