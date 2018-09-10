/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(var i=0;i<nums.length;i++){
        var count_1 = nums[i]
        var count_2 = nums[i]-count_1;
        for(var j=0;j<nums.length;j++){
            if(nums[j]==count_2){
                console(i,j)
            }
        }
    }

};