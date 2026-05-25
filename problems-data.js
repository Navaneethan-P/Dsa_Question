// LeetCode Top Interview Problems Data (Complete Secure Edition)
const TOP_150_PROBLEMS = [
  {
    "id": "merge-sorted-array",
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/merge-sorted-array/",
    "companies": [
      "Google",
      "Facebook",
      "Microsoft",
      "Amazon"
    ],
    "description": "Merge two sorted arrays nums1 and nums2 in-place inside nums1.\n\nConcrete Scenario Example:\nInput: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\nAlgorithm Flow: The solution processes elements incrementally using linear scans from the back.\nVisual Analogy: Think of organizing a queue of items by shifting them in-place rather than allocating a secondary table.",
    "optimalComplexity": {
      "time": "O(m + n)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O((m + n) log(m + n))",
      "space": "O(m + n)"
    },
    "optimizationPath": "Instead of copying elements to a new array and running a slow sort, merge back-to-front using two pointers to capitalize on the empty padding at the end of nums1.",
    "javaCode": "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        int p1 = m - 1;\n        int p2 = n - 1;\n        int p = m + n - 1;\n        \n        while (p1 >= 0 && p2 >= 0) {\n            if (nums1[p1] > nums2[p2]) {\n                nums1[p] = nums1[p1--];\n            } else {\n                nums1[p] = nums2[p2--];\n            }\n            p--;\n        }\n        while (p2 >= 0) {\n            nums1[p--] = nums2[p2--];\n        }\n    }\n}",
    "bruteForceCode": "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        for (int i = 0; i < n; i++) {\n            nums1[m + i] = nums2[i];\n        }\n        java.util.Arrays.sort(nums1);\n    }\n}",
    "workflowExplanation": [
      {
        "title": "Initialize Pointers",
        "description": "Set p1 to point at the last valid element of nums1 (m - 1). Set p2 to point at the last element of nums2 (n - 1). Set p to point at the last empty slot in nums1 (m + n - 1)."
      },
      {
        "title": "Iterate and Compare",
        "description": "While both p1 and p2 are valid (>= 0), compare the elements they point to. Place the larger element at the position pointed to by p."
      },
      {
        "title": "Shift Pointers Leftward",
        "description": "Decrement the pointer (p1 or p2) of the array that had the larger element. Always decrement p."
      },
      {
        "title": "Flush Remaining Elements",
        "description": "If any elements remain in nums2 (p2 >= 0), copy them into the beginning of nums1."
      }
    ],
    "flowDiagram": [
      {
        "title": "Initialize Pointers",
        "description": "p1 points to index m-1, p2 points to index n-1, p points to index m+n-1."
      },
      {
        "title": "Right-to-Left Compare",
        "description": "Compare nums1[p1] and nums2[p2], place larger at nums1[p], shift pointer and index p leftward."
      },
      {
        "title": "Flush nums2",
        "description": "If p2 >= 0 elements are left, write them to remaining indexes in nums1."
      }
    ],
    "tips": [
      "Always think about writing from the back if the destination array has sufficient trailing buffer space.",
      "O(1) extra space means modifying the existing arrays in-place without allocations."
    ]
  },
  {
    "id": "remove-element",
    "title": "Remove Element",
    "difficulty": "Easy",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/remove-element/",
    "companies": [
      "Microsoft",
      "Amazon"
    ],
    "description": "Remove all occurrences of val in array nums in-place. Return the number of elements not equal to val.\n\nConcrete Scenario Example:\nInput: nums = [3,2,2,3], val = 3\nAlgorithm Flow: The solution processes elements incrementally using linear scans.\nVisual Analogy: Squeezing air bubbles out of a line of blocks, moving all solid blocks to the left.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "optimizationPath": "Avoid shifting elements on every deletion. Use a single-pass write pointer to compact the array in O(N) time.",
    "javaCode": "class Solution {\n    public int removeElement(int[] nums, int val) {\n        int index = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] != val) {\n                nums[index++] = nums[i];\n            }\n        }\n        return index;\n    }\n}",
    "bruteForceCode": "class Solution {\n    public int removeElement(int[] nums, int val) {\n        java.util.List<Integer> temp = new java.util.ArrayList<>();\n        for (int num : nums) {\n            if (num != val) temp.add(num);\n        }\n        for (int i = 0; i < temp.size(); i++) {\n            nums[i] = temp.get(i);\n        }\n        return temp.size();\n    }\n}",
    "workflowExplanation": [
      {
        "title": "Initialize Write Pointer",
        "description": "Set an 'index' pointer to 0. This pointer will keep track of where the next valid element should be placed."
      },
      {
        "title": "Scan Elements",
        "description": "Iterate through the array from left to right using a read pointer 'i'."
      },
      {
        "title": "Keep Valid Elements",
        "description": "If the element at the current read pointer 'i' is NOT equal to the target 'val', copy it to the position at 'index'."
      },
      {
        "title": "Advance Write Pointer",
        "description": "Increment the 'index' pointer only when a valid element is copied. The final value of 'index' will be the count of valid elements."
      }
    ],
    "flowDiagram": [
      {
        "title": "Scan Elements",
        "description": "Check each element nums[i]. If it's not equal to val, write it to index."
      },
      {
        "title": "Update Write Pointer",
        "description": "Increment write index. Ignore elements that equal val."
      }
    ],
    "tips": [
      "The two-pointer technique (read and write pointers) is ideal for in-place array compaction.",
      "Elements beyond the returned length do not matter."
    ]
  },
  {
    "id": "remove-duplicates-from-sorted-array",
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "companies": [
      "Facebook",
      "Microsoft",
      "Bloomberg"
    ],
    "description": "Remove duplicates from sorted array in-place such that each unique element appears only once.\n\nConcrete Scenario Example:\nInput: nums = [1,1,2]\nAlgorithm Flow: Pointers shift items dynamically when unique values are identified.\nVisual Analogy: Removing duplicate files from a sorted directory list.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "optimizationPath": "Since the array is sorted, duplicates are adjacent. Use a slow write pointer and a fast read pointer.",
    "javaCode": "class Solution {\n    public int removeDuplicates(int[] nums) {\n        if (nums == null || nums.length == 0) return 0;\n        int writeIndex = 1;\n        for (int readIndex = 1; readIndex < nums.length; readIndex++) {\n            if (nums[readIndex] != nums[readIndex - 1]) {\n                nums[writeIndex++] = nums[readIndex];\n            }\n        }\n        return writeIndex;\n    }\n}",
    "bruteForceCode": "class Solution {\n    public int removeDuplicates(int[] nums) {\n        java.util.Set<Integer> set = new java.util.LinkedHashSet<>();\n        for (int num : nums) set.add(num);\n        int i = 0;\n        for (int val : set) {\n            nums[i++] = val;\n        }\n        return set.size();\n    }\n}",
    "workflowExplanation": [
      {
        "title": "Check Base Cases",
        "description": "If the array is empty, return 0."
      },
      {
        "title": "Set Pointers",
        "description": "Initialize a write pointer at index 1 since the first element is always unique."
      },
      {
        "title": "Scan and Compare",
        "description": "Iterate from index 1 to the end. Compare current element with the previous element."
      },
      {
        "title": "Update Unique Elements",
        "description": "If current element is different from the previous, copy it to the write pointer and increment it."
      }
    ],
    "flowDiagram": [
      {
        "title": "Initial Check",
        "description": "Check if length is zero. Initialize write pointer at 1."
      },
      {
        "title": "Iterative Compare",
        "description": "If nums[i] != nums[i-1], copy to write index and advance write index."
      }
    ],
    "tips": [
      "Capitalize on the sorted nature of the array to only look at adjacent elements."
    ]
  },
  {
    "id": "remove-duplicates-from-sorted-array-ii",
    "title": "Remove Duplicates from Sorted Array II",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
    "companies": [
      "Facebook",
      "Microsoft"
    ],
    "description": "Remove duplicates from sorted array in-place such that duplicates are allowed at most twice.\n\nConcrete Scenario Example:\nInput: nums = [1,1,1,2,2,3]\nOutput: 5, nums = [1,1,2,2,3]\nVisual Analogy: A store checkout line where at most two copies of the same item are kept in line, any third duplicate is set aside.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "optimizationPath": "Generalize the two-pointer approach by comparing the current element with the element two positions behind the write index.",
    "javaCode": "class Solution {\n    public int removeDuplicates(int[] nums) {\n        if (nums.length <= 2) return nums.length;\n        int index = 2;\n        for (int i = 2; i < nums.length; i++) {\n            if (nums[i] != nums[index - 2]) {\n                nums[index++] = nums[i];\n            }\n        }\n        return index;\n    }\n}",
    "bruteForceCode": "class Solution {\n    public int removeDuplicates(int[] nums) {\n        java.util.Map<Integer, Integer> map = new java.util.HashMap<>();\n        java.util.List<Integer> list = new java.util.ArrayList<>();\n        for (int num : nums) {\n            int count = map.getOrDefault(num, 0);\n            if (count < 2) {\n                list.add(num);\n                map.put(num, count + 1);\n            }\n        }\n        for (int i = 0; i < list.size(); i++) {\n            nums[i] = list.get(i);\n        }\n        return list.size();\n    }\n}",
    "workflowExplanation": [
      {
        "title": "Check Threshold",
        "description": "If size is <= 2, return size directly as duplicates up to twice are valid."
      },
      {
        "title": "Pointer Initialization",
        "description": "Set the write index pointer to 2."
      },
      {
        "title": "Scan Elements",
        "description": "Iterate from index 2. Compare nums[i] with nums[index - 2]."
      },
      {
        "title": "Conditional Write",
        "description": "If the elements differ, copy nums[i] to index and advance the write index."
      }
    ],
    "flowDiagram": [
      {
        "title": "Start Scan",
        "description": "Set write index = 2. Iterate read pointer i from 2 to N."
      },
      {
        "title": "Compare with Write - 2",
        "description": "If nums[i] is different from nums[write-2], write to index, advance index."
      }
    ],
    "tips": [
      "This two-pointer condition (nums[i] != nums[index - k]) generalizes to allowing at most k duplicates."
    ]
  },
  {
    "id": "majority-element",
    "title": "Majority Element",
    "difficulty": "Easy",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/majority-element/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "description": "Find the element that appears more than floor(N/2) times in the array.\n\nConcrete Scenario Example:\nInput: nums = [3,2,3]\nOutput: 3\nVisual Analogy: A political vote where candidate votes cancel out opposing candidate votes, leaving only the majority winner.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N log N)",
      "space": "O(1)"
    },
    "optimizationPath": "Instead of sorting or hashing, use Boyer-Moore Voting Algorithm to find the majority element in a single pass with O(1) space.",
    "javaCode": "class Solution {\n    public int majorityElement(int[] nums) {\n        int candidate = nums[0];\n        int count = 0;\n        for (int num : nums) {\n            if (count == 0) {\n                candidate = num;\n            }\n            count += (num == candidate) ? 1 : -1;\n        }\n        return candidate;\n    }\n}",
    "bruteForceCode": "class Solution {\n    public int majorityElement(int[] nums) {\n        java.util.Arrays.sort(nums);\n        return nums[nums.length / 2];\n    }\n}",
    "workflowExplanation": [
      {
        "title": "Boyer-Moore Initiative",
        "description": "Initialize candidate with the first element and count to 0."
      },
      {
        "title": "Traverse & Vote",
        "description": "For each number: if count is 0, assign candidate to that number."
      },
      {
        "title": "Adjust Count",
        "description": "If number is the candidate, increment count, else decrement it."
      },
      {
        "title": "Return Candidate",
        "description": "The remaining candidate is guaranteed to be the majority element."
      }
    ],
    "flowDiagram": [
      {
        "title": "Vote Processing",
        "description": "Scan each element. Update candidate if count is zero."
      },
      {
        "title": "Balance Count",
        "description": "Increment if matches candidate, decrement otherwise."
      }
    ],
    "tips": [
      "Boyer-Moore Voting Algorithm works because the majority element appears more than N/2 times."
    ]
  },
  {
    "id": "rotate-array",
    "title": "Rotate Array",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
    "companies": [
      "Microsoft",
      "Amazon",
      "Uber"
    ],
    "description": "Rotate an array to the right by k steps.\n\nConcrete Scenario Example:\nInput: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]\nVisual Analogy: Reversing train cars and reversing individual sections to restore forward direction.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "optimizationPath": "Instead of allocating an auxiliary array, reverse the entire array, then reverse the first k elements, and finally reverse the remaining elements.",
    "javaCode": "class Solution {\n    public void rotate(int[] nums, int k) {\n        int n = nums.length;\n        k = k % n;\n        reverse(nums, 0, n - 1);\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, n - 1);\n    }\n    private void reverse(int[] nums, int start, int end) {\n        while (start < end) {\n            int temp = nums[start];\n            nums[start++] = nums[end];\n            nums[end--] = temp;\n        }\n    }\n}",
    "bruteForceCode": "class Solution {\n    public void rotate(int[] nums, int k) {\n        int n = nums.length;\n        int[] temp = new int[n];\n        for (int i = 0; i < n; i++) {\n            temp[(i + k) % n] = nums[i];\n        }\n        System.arraycopy(temp, 0, nums, 0, n);\n    }\n}",
    "workflowExplanation": [
      {
        "title": "Normalize k",
        "description": "k = k % length handles cases where rotation amount exceeds length."
      },
      {
        "title": "Full Reverse",
        "description": "Reverse the entire array. Elements at the end move to the front but reversed."
      },
      {
        "title": "Reverse Part 1",
        "description": "Reverse the first k elements to restore their original relative order."
      },
      {
        "title": "Reverse Part 2",
        "description": "Reverse the remaining elements to restore their order."
      }
    ],
    "flowDiagram": [
      {
        "title": "Full Reverse",
        "description": "Reverse array from index 0 to N-1."
      },
      {
        "title": "Sub Reverse",
        "description": "Reverse index 0 to k-1, and index k to N-1."
      }
    ],
    "tips": [
      "Reversal algorithm is a classic trick for rotating blocks of memory in O(1) space."
    ]
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find maximum profit from buying and selling stock once.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Single pass linear scan keeping track of minimum price seen so far and max profit.",
    "javaCode": "class Solution {\n    public int maxProfit(int[] prices) {\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n        for (int price : prices) {\n            if (price < minPrice) {\n                minPrice = price;\n            } else if (price - minPrice > maxProfit) {\n                maxProfit = price - minPrice;\n            }\n        }\n        return maxProfit;\n    }\n}"
  },
  {
    "id": "best-time-to-buy-and-sell-stock-ii",
    "title": "Best Time to Buy and Sell Stock II",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Maximize profit buying and selling stock multiple times.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Accumulate profit from every consecutive increase (greedy ascent).",
    "javaCode": "class Solution {\n    public int maxProfit(int[] prices) {\n        int maxProfit = 0;\n        for (int i = 1; i < prices.length; i++) {\n            if (prices[i] > prices[i - 1]) {\n                maxProfit += prices[i] - prices[i - 1];\n            }\n        }\n        return maxProfit;\n    }\n}"
  },
  {
    "id": "jump-game",
    "title": "Jump Game",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/jump-game/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Determine if you can reach the last index from the first index.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Greedy: Track the maximum reachable index from current positions.",
    "javaCode": "class Solution {\n    public boolean canJump(int[] nums) {\n        int maxReach = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (i > maxReach) return false;\n            maxReach = Math.max(maxReach, i + nums[i]);\n        }\n        return true;\n    }\n}"
  },
  {
    "id": "jump-game-ii",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/jump-game-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find the minimum number of jumps to reach the last index.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Greedy range scanning: update the maximum boundary possible with each jump step.",
    "javaCode": "class Solution {\n    public int jump(int[] nums) {\n        int jumps = 0, currentEnd = 0, farthest = 0;\n        for (int i = 0; i < nums.length - 1; i++) {\n            farthest = Math.max(farthest, i + nums[i]);\n            if (i == currentEnd) {\n                jumps++;\n                currentEnd = farthest;\n            }\n        }\n        return jumps;\n    }\n}"
  },
  {
    "id": "h-index",
    "title": "H-Index",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/h-index/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Calculate researcher's H-Index based on citations.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use bucket sort count array instead of sorting citations to achieve O(N) time.",
    "javaCode": "class Solution {\n    public int hIndex(int[] citations) {\n        int n = citations.length;\n        int[] buckets = new int[n + 1];\n        for (int c : citations) {\n            if (c >= n) buckets[n]++;\n            else buckets[c]++;\n        }\n        int count = 0;\n        for (int i = n; i >= 0; i--) {\n            count += buckets[i];\n            if (count >= i) return i;\n        }\n        return 0;\n    }\n}"
  },
  {
    "id": "insert-delete-getrandom-o1",
    "title": "Insert Delete GetRandom O(1)",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/insert-delete-getrandom-o1/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Design a set supporting insert, delete, getRandom in O(1) time.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(1)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Combine an ArrayList for fast indexing/random selection with a HashMap for fast value lookup.",
    "javaCode": "class RandomizedSet {\n    private java.util.ArrayList<Integer> list = new java.util.ArrayList<>();\n    private java.util.HashMap<Integer, Integer> map = new java.util.HashMap<>();\n    private java.util.Random rand = new java.util.Random();\n    \n    public boolean insert(int val) {\n        if (map.containsKey(val)) return false;\n        map.put(val, list.size());\n        list.add(val);\n        return true;\n    }\n    public boolean remove(int val) {\n        if (!map.containsKey(val)) return false;\n        int index = map.get(val);\n        int lastVal = list.get(list.size() - 1);\n        list.set(index, lastVal);\n        map.put(lastVal, index);\n        list.remove(list.size() - 1);\n        map.remove(val);\n        return true;\n    }\n    public int getRandom() {\n        return list.get(rand.nextInt(list.size()));\n    }\n}"
  },
  {
    "id": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/product-of-array-except-self/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Return an array where output[i] is the product of all elements except nums[i].\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use the output array to compute prefix products, then calculate suffix products on the fly.",
    "javaCode": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        res[0] = 1;\n        for (int i = 1; i < n; i++) {\n            res[i] = res[i - 1]  nums[i - 1];\n        }\n        int right = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] = right;\n            right = nums[i];\n        }\n        return res;\n    }\n}"
  },
  {
    "id": "gas-station",
    "title": "Gas Station",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/gas-station/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find the starting gas station to complete a circular circuit.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Greedy: scan once, track total tank and if current tank drops below zero reset start index.",
    "javaCode": "class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        int totalGas = 0, totalCost = 0, start = 0, tank = 0;\n        for (int i = 0; i < gas.length; i++) {\n            totalGas += gas[i];\n            totalCost += cost[i];\n            tank += gas[i] - cost[i];\n            if (tank < 0) {\n                start = i + 1;\n                tank = 0;\n            }\n        }\n        return (totalGas >= totalCost) ? start : -1;\n    }\n}"
  },
  {
    "id": "candy",
    "title": "Candy",
    "difficulty": "Hard",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/candy/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Distribute candies to children satisfying ratings constraint with minimum candy.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Two-pass approach: compare ratings left-to-right, then right-to-left.",
    "javaCode": "class Solution {\n    public int candy(int[] ratings) {\n        int n = ratings.length;\n        int[] candies = new int[n];\n        java.util.Arrays.fill(candies, 1);\n        for (int i = 1; i < n; i++) {\n            if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n        }\n        for (int i = n - 2; i >= 0; i--) {\n            if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n        }\n        int sum = 0;\n        for (int c : candies) sum += c;\n        return sum;\n    }\n}"
  },
  {
    "id": "trapping-rain-water",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/trapping-rain-water/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Compute trapped rain water in elevation map after raining.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Two-pointer scan: shrink boundaries and add capacity based on max height left and right.",
    "javaCode": "class Solution {\n    public int trap(int[] height) {\n        int left = 0, right = height.length - 1;\n        int leftMax = 0, rightMax = 0, trapped = 0;\n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) leftMax = height[left];\n                else trapped += leftMax - height[left];\n                left++;\n            } else {\n                if (height[right] >= rightMax) rightMax = height[right];\n                else trapped += rightMax - height[right];\n                right--;\n            }\n        }\n        return trapped;\n    }\n}"
  },
  {
    "id": "roman-to-integer",
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/roman-to-integer/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Convert roman numeral string to integer.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Map roman characters to integer values and subtract instead of adding if left < right character.",
    "javaCode": "class Solution {\n    public int romanToInt(String s) {\n        java.util.Map<Character, Integer> map = new java.util.HashMap<>();\n        map.put('I', 1); map.put('V', 5); map.put('X', 10);\n        map.put('L', 50); map.put('C', 100); map.put('D', 500); map.put('M', 1000);\n        int res = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int val = map.get(s.charAt(i));\n            if (i < s.length() - 1 && val < map.get(s.charAt(i + 1))) {\n                res -= val;\n            } else {\n                res += val;\n            }\n        }\n        return res;\n    }\n}"
  },
  {
    "id": "integer-to-roman",
    "title": "Integer to Roman",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/integer-to-roman/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Convert integer to roman numeral string.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Greedy division: compare input value against standard decending roman values array.",
    "javaCode": "class Solution {\n    public String intToRoman(int num) {\n        int[] vals = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\n        String[] symbols = {\"M\",\"CM\",\"D\",\"CD\",\"C\",\"XC\",\"L\",\"XL\",\"X\",\"IX\",\"V\",\"IV\",\"I\"};\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < vals.length; i++) {\n            while (num >= vals[i]) {\n                num -= vals[i];\n                sb.append(symbols[i]);\n            }\n        }\n        return sb.toString();\n    }\n}"
  },
  {
    "id": "length-of-last-word",
    "title": "Length of Last Word",
    "difficulty": "Easy",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/length-of-last-word/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find length of the last word in a string containing spaces.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Iterate from back to skip trailing spaces, then count characters until first space.",
    "javaCode": "class Solution {\n    public int lengthOfLastWord(String s) {\n        int length = 0;\n        int i = s.length() - 1;\n        while (i >= 0 && s.charAt(i) == ' ') i--;\n        while (i >= 0 && s.charAt(i) != ' ') {\n            length++;\n            i--;\n        }\n        return length;\n    }\n}"
  },
  {
    "id": "longest-common-prefix",
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/longest-common-prefix/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find the longest common prefix among an array of strings.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(S)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Sort strings array or iteratively shorten prefix using string.indexOf comparisons.",
    "javaCode": "class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        if (strs == null || strs.length == 0) return \"\";\n        String prefix = strs[0];\n        for (int i = 1; i < strs.length; i++) {\n            while (strs[i].indexOf(prefix) != 0) {\n                prefix = prefix.substring(0, prefix.length() - 1);\n                if (prefix.isEmpty()) return \"\";\n            }\n        }\n        return prefix;\n    }\n}"
  },
  {
    "id": "reverse-words-in-a-string",
    "title": "Reverse Words in a String",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/reverse-words-in-a-string/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Reverse word order and remove duplicate spaces in a string.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Two pointers from the end, skip space, slice words, and join them with spaces.",
    "javaCode": "class Solution {\n    public String reverseWords(String s) {\n        StringBuilder sb = new StringBuilder();\n        int i = s.length() - 1;\n        while (i >= 0) {\n            while (i >= 0 && s.charAt(i) == ' ') i--;\n            if (i < 0) break;\n            int j = i;\n            while (i >= 0 && s.charAt(i) != ' ') i--;\n            if (sb.length() > 0) sb.append(\" \");\n            sb.append(s.substring(i + 1, j + 1));\n        }\n        return sb.toString();\n    }\n}"
  },
  {
    "id": "zigzag-conversion",
    "title": "Zigzag Conversion",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/zigzag-conversion/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Convert string in zigzag pattern in k rows.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use an array of StringBuilders, iterate string characters, flip direction at row bounds.",
    "javaCode": "class Solution {\n    public String convert(String s, int numRows) {\n        if (numRows <= 1) return s;\n        StringBuilder[] rows = new StringBuilder[numRows];\n        for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();\n        int curRow = 0;\n        boolean goingDown = false;\n        for (char c : s.toCharArray()) {\n            rows[curRow].append(c);\n            if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;\n            curRow += goingDown ? 1 : -1;\n        }\n        StringBuilder res = new StringBuilder();\n        for (StringBuilder r : rows) res.append(r);\n        return res.toString();\n    }\n}"
  },
  {
    "id": "find-the-index-of-the-first-occurrence-in-a-string",
    "title": "Find the Index of the First Occurrence in a String",
    "difficulty": "Easy",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find starting index of needle in haystack.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(NM)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Simple substring scanning or use KMP algorithm for linear time.",
    "javaCode": "class Solution {\n    public int strStr(String haystack, String needle) {\n        if (needle.isEmpty()) return 0;\n        int h = haystack.length(), n = needle.length();\n        for (int i = 0; i <= h - n; i++) {\n            if (haystack.substring(i, i + n).equals(needle)) {\n                return i;\n            }\n        }\n        return -1;\n    }\n}"
  },
  {
    "id": "text-justification",
    "title": "Text Justification",
    "difficulty": "Hard",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/text-justification/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Format lines of text with even spacing.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Pack maximum words possible in each line, then evenly distribute spaces.",
    "javaCode": "class Solution {\n    public java.util.List<String> fullJustify(String[] words, int maxWidth) {\n        java.util.List<String> res = new java.util.ArrayList<>();\n        int i = 0, n = words.length;\n        while (i < n) {\n            int len = words[i].length();\n            int j = i + 1;\n            while (j < n && len + 1 + words[j].length() <= maxWidth) {\n                len += 1 + words[j].length();\n                j++;\n            }\n            StringBuilder sb = new StringBuilder();\n            int diff = j - i - 1;\n            if (j == n || diff == 0) {\n                for (int k = i; k < j; k++) {\n                    sb.append(words[k]);\n                    if (k < j - 1) sb.append(\" \");\n                }\n                while (sb.length() < maxWidth) sb.append(\" \");\n            } else {\n                int spaces = (maxWidth - len) / diff + 1;\n                int r = (maxWidth - len) % diff;\n                for (int k = i; k < j; k++) {\n                    sb.append(words[k]);\n                    if (k < j - 1) {\n                        int count = spaces + (k - i < r ? 1 : 0);\n                        for (int s = 0; s < count; s++) sb.append(\" \");\n                    }\n                }\n            }\n            res.add(sb.toString());\n            i = j;\n        }\n        return res;\n    }\n}"
  },
  {
    "id": "valid-palindrome",
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "category": "Two Pointers",
    "leetcodeUrl": "https://leetcode.com/problems/valid-palindrome/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if alphanumeric characters in string are symmetric.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Two pointers sliding from ends inwards, skipping non-alphanumeric chars.",
    "javaCode": "class Solution {\n    public boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n            l++; r--;\n        }\n        return true;\n    }\n}"
  },
  {
    "id": "is-subsequence",
    "title": "Is Subsequence",
    "difficulty": "Easy",
    "category": "Two Pointers",
    "leetcodeUrl": "https://leetcode.com/problems/is-subsequence/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if string s is subsequence of t.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Linear matching scan: advance s pointer whenever characters match.",
    "javaCode": "class Solution {\n    public boolean isSubsequence(String s, String t) {\n        int i = 0, j = 0;\n        while (i < s.length() && j < t.length()) {\n            if (s.charAt(i) == t.charAt(j)) i++;\n            j++;\n        }\n        return i == s.length();\n    }\n}"
  },
  {
    "id": "two-sum-ii-input-array-is-sorted",
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Medium",
    "category": "Two Pointers",
    "leetcodeUrl": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find two numbers summing up to target in 1-indexed sorted array.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Two pointers at array ends: shift left up if sum < target, else shift right down.",
    "javaCode": "class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        int l = 0, r = numbers.length - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return new int[]{l + 1, r + 1};\n            if (sum < target) l++;\n            else r--;\n        }\n        return new int[0];\n    }\n}"
  },
  {
    "id": "container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "category": "Two Pointers",
    "leetcodeUrl": "https://leetcode.com/problems/container-with-most-water/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find vertical lines that hold the most water.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Two pointers at endpoints: compute capacity, then greedily advance the shorter line pointer.",
    "javaCode": "class Solution {\n    public int maxArea(int[] height) {\n        int l = 0, r = height.length - 1, max = 0;\n        while (l < r) {\n            max = Math.max(max, Math.min(height[l], height[r])  (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return max;\n    }\n}"
  },
  {
    "id": "3sum",
    "title": "3Sum",
    "difficulty": "Medium",
    "category": "Two Pointers",
    "leetcodeUrl": "https://leetcode.com/problems/3sum/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find all unique triplets that sum up to zero.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N^2)",
      "space": "O(log N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Sort array, fix one element, and solve Two Sum II for the remaining using two pointers.",
    "javaCode": "class Solution {\n    public java.util.List<java.util.List<Integer>> threeSum(int[] nums) {\n        java.util.List<java.util.List<Integer>> res = new java.util.ArrayList<>();\n        java.util.Arrays.sort(nums);\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.add(java.util.Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return res;\n    }\n}"
  },
  {
    "id": "minimum-size-subarray-sum",
    "title": "Minimum Size Subarray Sum",
    "difficulty": "Medium",
    "category": "Sliding Window",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-size-subarray-sum/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find minimum length subarray summing up to target.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Expanding dynamic window: expand right, then continuously shrink left if sum >= target.",
    "javaCode": "class Solution {\n    public int minSubArrayLen(int target, int[] nums) {\n        int min = Integer.MAX_VALUE, sum = 0, l = 0;\n        for (int r = 0; r < nums.length; r++) {\n            sum += nums[r];\n            while (sum >= target) {\n                min = Math.min(min, r - l + 1);\n                sum -= nums[l++];\n            }\n        }\n        return min == Integer.MAX_VALUE ? 0 : min;\n    }\n}"
  },
  {
    "id": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "category": "Sliding Window",
    "leetcodeUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find longest substring without duplicate characters.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(min(M, K))"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use sliding window map or boolean array to track positions and shrink left on duplicates.",
    "javaCode": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int[] index = new int[128];\n        int max = 0, l = 0;\n        for (int r = 0; r < s.length(); r++) {\n            l = Math.max(l, index[s.charAt(r)]);\n            max = Math.max(max, r - l + 1);\n            index[s.charAt(r)] = r + 1;\n        }\n        return max;\n    }\n}"
  },
  {
    "id": "substring-with-concatenation-of-all-words",
    "title": "Substring with Concatenation of All Words",
    "difficulty": "Hard",
    "category": "Sliding Window",
    "leetcodeUrl": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find all starting indices of substrings concatenating all words.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N  wordLen)",
      "space": "O(M)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Sliding window over word block offsets, keeping counts of valid matched words.",
    "javaCode": "class Solution {\n    public java.util.List<Integer> findSubstring(String s, String[] words) {\n        java.util.List<Integer> res = new java.util.ArrayList<>();\n        if (s == null || words == null || words.length == 0) return res;\n        int wordLen = words[0].length(), numWords = words.length;\n        int totalLen = wordLen  numWords;\n        java.util.Map<String, Integer> wordCounts = new java.util.HashMap<>();\n        for (String w : words) wordCounts.put(w, wordCounts.getOrDefault(w, 0) + 1);\n        \n        for (int i = 0; i < wordLen; i++) {\n            int l = i, count = 0;\n            java.util.Map<String, Integer> currentCounts = new java.util.HashMap<>();\n            for (int r = i; r + wordLen <= s.length(); r += wordLen) {\n                String sub = s.substring(r, r + wordLen);\n                if (wordCounts.containsKey(sub)) {\n                    currentCounts.put(sub, currentCounts.getOrDefault(sub, 0) + 1);\n                    count++;\n                    while (currentCounts.get(sub) > wordCounts.get(sub)) {\n                        String dec = s.substring(l, l + wordLen);\n                        currentCounts.put(dec, currentCounts.get(dec) - 1);\n                        count--;\n                        l += wordLen;\n                    }\n                    if (count == numWords) {\n                        res.add(l);\n                    }\n                } else {\n                    currentCounts.clear();\n                    count = 0;\n                    l = r + wordLen;\n                }\n            }\n        }\n        return res;\n    }\n}"
  },
  {
    "id": "minimum-window-substring",
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "category": "Sliding Window",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-window-substring/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find smallest substring in s containing all chars of t.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N + M)",
      "space": "O(K)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Slide window right, shrink left as long as window meets character requirement.",
    "javaCode": "class Solution {\n    public String minWindow(String s, String t) {\n        int[] map = new int[128];\n        for (char c : t.toCharArray()) map[c]++;\n        int counter = t.length(), l = 0, r = 0, minLen = Integer.MAX_VALUE, head = 0;\n        while (r < s.length()) {\n            if (map[s.charAt(r++)]-- > 0) counter--;\n            while (counter == 0) {\n                if (r - l < minLen) {\n                    minLen = r - l;\n                    head = l;\n                }\n                if (map[s.charAt(l++)]++ == 0) counter++;\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? \"\" : s.substring(head, head + minLen);\n    }\n}"
  },
  {
    "id": "valid-sudoku",
    "title": "Valid Sudoku",
    "difficulty": "Medium",
    "category": "Matrix",
    "leetcodeUrl": "https://leetcode.com/problems/valid-sudoku/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Validate a 9x9 Sudoku board configuration.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "A single pass validation checking rows, columns, and 3x3 box indexes with helper arrays.",
    "javaCode": "class Solution {\n    public boolean isValidSudoku(char[][] board) {\n        java.util.Set<String> seen = new java.util.HashSet<>();\n        for (int i = 0; i < 9; i++) {\n            for (int j = 0; j < 9; j++) {\n                char c = board[i][j];\n                if (c != '.') {\n                    if (!seen.add(c + \" in row \" + i) ||\n                        !seen.add(c + \" in col \" + j) ||\n                        !seen.add(c + \" in box \" + i/3 + \"-\" + j/3)) {\n                        return false;\n                    }\n                }\n            }\n        }\n        return true;\n    }\n}"
  },
  {
    "id": "spiral-matrix",
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "category": "Matrix",
    "leetcodeUrl": "https://leetcode.com/problems/spiral-matrix/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Retrieve elements of a matrix in spiral order.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(RC)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Track top, bottom, left, right borders and shrink them as we traverse clockwise.",
    "javaCode": "class Solution {\n    public java.util.List<Integer> spiralOrder(int[][] matrix) {\n        java.util.List<Integer> res = new java.util.ArrayList<>();\n        if (matrix.length == 0) return res;\n        int t = 0, b = matrix.length - 1, l = 0, r = matrix[0].length - 1;\n        while (t <= b && l <= r) {\n            for (int i = l; i <= r; i++) res.add(matrix[t][i]);\n            t++;\n            for (int i = t; i <= b; i++) res.add(matrix[i][r]);\n            r--;\n            if (t <= b) {\n                for (int i = r; i >= l; i--) res.add(matrix[b][i]);\n                b--;\n            }\n            if (l <= r) {\n                for (int i = b; i >= t; i--) res.add(matrix[i][l]);\n                l++;\n            }\n        }\n        return res;\n    }\n}"
  },
  {
    "id": "rotate-image",
    "title": "Rotate Image",
    "difficulty": "Medium",
    "category": "Matrix",
    "leetcodeUrl": "https://leetcode.com/problems/rotate-image/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Rotate an n x n matrix 90 degrees clockwise in-place.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N^2)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Transpose the matrix, then reverse each row.",
    "javaCode": "class Solution {\n    public void rotate(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i; j < n; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n / 2; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[i][n - 1 - j];\n                matrix[i][n - 1 - j] = temp;\n            }\n        }\n    }\n}"
  },
  {
    "id": "set-matrix-zeroes",
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "category": "Matrix",
    "leetcodeUrl": "https://leetcode.com/problems/set-matrix-zeroes/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Set rows and columns containing 0 to zero in-place.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(RC)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use first row and column of matrix as markers for row/col zeros, track first row/col separately.",
    "javaCode": "class Solution {\n    public void setZeroes(int[][] matrix) {\n        boolean rowZero = false, colZero = false;\n        int r = matrix.length, c = matrix[0].length;\n        for (int i = 0; i < r; i++) if (matrix[i][0] == 0) colZero = true;\n        for (int j = 0; j < c; j++) if (matrix[0][j] == 0) rowZero = true;\n        for (int i = 1; i < r; i++) {\n            for (int j = 1; j < c; j++) {\n                if (matrix[i][j] == 0) {\n                    matrix[i][0] = 0;\n                    matrix[0][j] = 0;\n                }\n            }\n        }\n        for (int i = 1; i < r; i++) {\n            for (int j = 1; j < c; j++) {\n                if (matrix[i][0] == 0 || matrix[0][j] == 0) {\n                    matrix[i][j] = 0;\n                }\n            }\n        }\n        if (colZero) {\n            for (int i = 0; i < r; i++) matrix[i][0] = 0;\n        }\n        if (rowZero) {\n            for (int j = 0; j < c; j++) matrix[0][j] = 0;\n        }\n    }\n}"
  },
  {
    "id": "game-of-life",
    "title": "Game of Life",
    "difficulty": "Medium",
    "category": "Matrix",
    "leetcodeUrl": "https://leetcode.com/problems/game-of-life/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Compute the next state of Conway's Game of Life grid.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(RC)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Encode next states inside original grid elements to maintain in-place space requirements.",
    "javaCode": "class Solution {\n    public void gameOfLife(int[][] board) {\n        int r = board.length, c = board[0].length;\n        int[] d = {-1, 0, 1};\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                int liveNeighbors = 0;\n                for (int x : d) {\n                    for (int y : d) {\n                        if (x == 0 && y == 0) continue;\n                        int ni = i + x, nj = j + y;\n                        if (ni >= 0 && ni < r && nj >= 0 && nj < c && (board[ni][nj] == 1 || board[ni][nj] == 2)) {\n                            liveNeighbors++;\n                        }\n                    }\n                }\n                if (board[i][j] == 1 && (liveNeighbors < 2 || liveNeighbors > 3)) board[i][j] = 2; // live to dead\n                if (board[i][j] == 0 && liveNeighbors == 3) board[i][j] = 3; // dead to live\n            }\n        }\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                if (board[i][j] == 2) board[i][j] = 0;\n                if (board[i][j] == 3) board[i][j] = 1;\n            }\n        }\n    }\n}"
  },
  {
    "id": "ransom-note",
    "title": "Ransom Note",
    "difficulty": "Easy",
    "category": "HashMap / HashSet",
    "leetcodeUrl": "https://leetcode.com/problems/ransom-note/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Can ransomNote string be constructed using characters from magazine?\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N + M)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use a integer frequency array of size 26 to check counts of letters in magazine.",
    "javaCode": "class Solution {\n    public boolean canConstruct(String ransomNote, String magazine) {\n        int[] counts = new int[26];\n        for (char c : magazine.toCharArray()) counts[c - 'a']++;\n        for (char c : ransomNote.toCharArray()) {\n            if (--counts[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n}"
  },
  {
    "id": "isomorphic-strings",
    "title": "Isomorphic Strings",
    "difficulty": "Easy",
    "category": "HashMap / HashSet",
    "leetcodeUrl": "https://leetcode.com/problems/isomorphic-strings/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if two strings are isomorphic.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use two integer arrays of size 256 to track last seen positions of characters.",
    "javaCode": "class Solution {\n    public boolean isIsomorphic(String s, String t) {\n        int[] mapS = new int[256];\n        int[] mapT = new int[256];\n        for (int i = 0; i < s.length(); i++) {\n            if (mapS[s.charAt(i)] != mapT[t.charAt(i)]) return false;\n            mapS[s.charAt(i)] = i + 1;\n            mapT[t.charAt(i)] = i + 1;\n        }\n        return true;\n    }\n}"
  },
  {
    "id": "word-pattern",
    "title": "Word Pattern",
    "difficulty": "Easy",
    "category": "HashMap / HashSet",
    "leetcodeUrl": "https://leetcode.com/problems/word-pattern/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if pattern matches string word layout.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(K)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Split string by spaces and map characters to words using a HashMap and uniqueness checks.",
    "javaCode": "class Solution {\n    public boolean wordPattern(String pattern, String s) {\n        String[] words = s.split(\" \");\n        if (words.length != pattern.length()) return false;\n        java.util.HashMap<Character, String> charToWord = new java.util.HashMap<>();\n        java.util.HashMap<String, Character> wordToChar = new java.util.HashMap<>();\n        for (int i = 0; i < pattern.length(); i++) {\n            char c = pattern.charAt(i);\n            String w = words[i];\n            if (charToWord.containsKey(c) && !charToWord.get(c).equals(w)) return false;\n            if (wordToChar.containsKey(w) && wordToChar.get(w) != c) return false;\n            charToWord.put(c, w);\n            wordToChar.put(w, c);\n        }\n        return true;\n    }\n}"
  },
  {
    "id": "valid-anagram",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "category": "HashMap / HashSet",
    "leetcodeUrl": "https://leetcode.com/problems/valid-anagram/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if two strings are anagrams.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use an integer array of size 26, increment counts for string s, decrement counts for t.",
    "javaCode": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] counts = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            counts[s.charAt(i) - 'a']++;\n            counts[t.charAt(i) - 'a']--;\n        }\n        for (int count : counts) if (count != 0) return false;\n        return true;\n    }\n}"
  },
  {
    "id": "group-anagrams",
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "category": "HashMap / HashSet",
    "leetcodeUrl": "https://leetcode.com/problems/group-anagrams/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Group similar anagram words together in lists.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N  L log L)",
      "space": "O(N  L)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use sorted strings as hash map keys to group similar strings together.",
    "javaCode": "class Solution {\n    public java.util.List<java.util.List<String>> groupAnagrams(String[] strs) {\n        java.util.HashMap<String, java.util.List<String>> map = new java.util.HashMap<>();\n        for (String s : strs) {\n            char[] chars = s.toCharArray();\n            java.util.Arrays.sort(chars);\n            String sorted = new String(chars);\n            if (!map.containsKey(sorted)) map.put(sorted, new java.util.ArrayList<>());\n            map.get(sorted).add(s);\n        }\n        return new java.util.ArrayList<>(map.values());\n    }\n}"
  },
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "category": "HashMap / HashSet",
    "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find indices of two numbers that sum up to target.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Single pass scan using a HashMap to store target complements.",
    "javaCode": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        java.util.HashMap<Integer, Integer> map = new java.util.HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}"
  },
  {
    "id": "happy-number",
    "title": "Happy Number",
    "difficulty": "Easy",
    "category": "HashMap / HashSet",
    "leetcodeUrl": "https://leetcode.com/problems/happy-number/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Determine if a number is happy (sum of digits squared leads to 1).\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(log N)",
      "space": "O(log N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Use Floyd's Cycle detection or a HashSet to detect infinite looping.",
    "javaCode": "class Solution {\n    public boolean isHappy(int n) {\n        int slow = n, fast = n;\n        do {\n            slow = getSum(slow);\n            fast = getSum(getSum(fast));\n        } while (slow != fast);\n        return slow == 1;\n    }\n    private int getSum(int n) {\n        int sum = 0;\n        while (n > 0) {\n            int d = n % 10;\n            sum += d  d;\n            n /= 10;\n        }\n        return sum;\n    }\n}"
  },
  {
    "id": "contains-duplicate-ii",
    "title": "Contains Duplicate II",
    "difficulty": "Easy",
    "category": "HashMap / HashSet",
    "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if two indices have identical values with diff at most k.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(min(N, k))"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Maintain a sliding HashSet of size k, remove old elements as window slides.",
    "javaCode": "class Solution {\n    public boolean containsNearbyDuplicate(int[] nums, int k) {\n        java.util.Set<Integer> set = new java.util.HashSet<>();\n        for (int i = 0; i < nums.length; i++) {\n            if (i > k) set.remove(nums[i - k - 1]);\n            if (!set.add(nums[i])) return true;\n        }\n        return false;\n    }\n}"
  },
  {
    "id": "longest-consecutive-sequence",
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "category": "HashMap / HashSet",
    "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find longest consecutive elements sequence length.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Insert all numbers in a HashSet, then query sequences only for numbers starting a sequence.",
    "javaCode": "class Solution {\n    public int longestConsecutive(int[] nums) {\n        java.util.Set<Integer> set = new java.util.HashSet<>();\n        for (int num : nums) set.add(num);\n        int max = 0;\n        for (int num : set) {\n            if (!set.contains(num - 1)) {\n                int cur = num;\n                int count = 1;\n                while (set.contains(cur + 1)) {\n                    cur++;\n                    count++;\n                }\n                max = Math.max(max, count);\n            }\n        }\n        return max;\n    }\n}"
  },
  {
    "id": "summary-ranges",
    "title": "Summary Ranges",
    "difficulty": "Easy",
    "category": "Intervals",
    "leetcodeUrl": "https://leetcode.com/problems/summary-ranges/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Return smallest sorted list of ranges covering all numbers.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Linear scan matching consecutive differences, formatting intervals accordingly.",
    "javaCode": "class Solution {\n    public java.util.List<String> summaryRanges(int[] nums) {\n        java.util.List<String> res = new java.util.ArrayList<>();\n        for (int i = 0; i < nums.length; i++) {\n            int start = nums[i];\n            while (i + 1 < nums.length && nums[i + 1] == nums[i] + 1) i++;\n            if (start != nums[i]) res.add(start + \"->\" + nums[i]);\n            else res.add(String.valueOf(start));\n        }\n        return res;\n    }\n}"
  },
  {
    "id": "merge-intervals",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "category": "Intervals",
    "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Merge overlapping intervals.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N log N)",
      "space": "O(log N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Sort intervals by start times, then merge linearly into output list.",
    "javaCode": "class Solution {\n    public int[][] merge(int[][] intervals) {\n        if (intervals.length <= 1) return intervals;\n        java.util.Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        java.util.List<int[]> merged = new java.util.ArrayList<>();\n        int[] current = intervals[0];\n        merged.add(current);\n        for (int[] interval : intervals) {\n            if (interval[0] <= current[1]) {\n                current[1] = Math.max(current[1], interval[1]);\n            } else {\n                current = interval;\n                merged.add(current);\n            }\n        }\n        return merged.toArray(new int[merged.size()][]);\n    }\n}"
  },
  {
    "id": "insert-interval",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "category": "Intervals",
    "leetcodeUrl": "https://leetcode.com/problems/insert-interval/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Insert a new interval into sorted non-overlapping list.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Linear insert: add all intervals ending before, merge overlapping, add remaining.",
    "javaCode": "class Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        java.util.List<int[]> res = new java.util.ArrayList<>();\n        int i = 0, n = intervals.length;\n        while (i < n && intervals[i][1] < newInterval[0]) {\n            res.add(intervals[i++]);\n        }\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        res.add(newInterval);\n        while (i < n) res.add(intervals[i++]);\n        return res.toArray(new int[res.size()][]);\n    }\n}"
  },
  {
    "id": "minimum-number-of-arrows-to-burst-balloons",
    "title": "Minimum Number of Arrows to Burst Balloons",
    "difficulty": "Medium",
    "category": "Intervals",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find min arrows needed to burst all balloons.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N log N)",
      "space": "O(log N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Sort balloons by end times, greedy arrows placement at interval endpoints.",
    "javaCode": "class Solution {\n    public int findMinArrowShots(int[][] points) {\n        if (points.length == 0) return 0;\n        java.util.Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n        int arrows = 1;\n        int end = points[0][1];\n        for (int i = 1; i < points.length; i++) {\n            if (points[i][0] > end) {\n                arrows++;\n                end = points[i][1];\n            }\n        }\n        return arrows;\n    }\n}"
  },
  {
    "id": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "category": "Stack",
    "leetcodeUrl": "https://leetcode.com/problems/valid-parentheses/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Verify brackets layout in string.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Push open brackets onto character Stack, verify matches on closing tags.",
    "javaCode": "class Solution {\n    public boolean isValid(String s) {\n        java.util.Stack<Character> stack = new java.util.Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}"
  },
  {
    "id": "simplify-path",
    "title": "Simplify Path",
    "difficulty": "Medium",
    "category": "Stack",
    "leetcodeUrl": "https://leetcode.com/problems/simplify-path/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Convert Unix absolute file path to simplified canonical path.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Split path by slash, skip empty/dot elements, pop stack on double dot, join with slash.",
    "javaCode": "class Solution {\n    public String simplifyPath(String path) {\n        java.util.Stack<String> stack = new java.util.Stack<>();\n        for (String dir : path.split(\"/\")) {\n            if (dir.equals(\"..\")) {\n                if (!stack.isEmpty()) stack.pop();\n            } else if (!dir.isEmpty() && !dir.equals(\".\")) {\n                stack.push(dir);\n            }\n        }\n        return \"/\" + String.join(\"/\", stack);\n    }\n}"
  },
  {
    "id": "min-stack",
    "title": "Min Stack",
    "difficulty": "Medium",
    "category": "Stack",
    "leetcodeUrl": "https://leetcode.com/problems/min-stack/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Design a stack retrieving minimum element in O(1) time.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(1)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Keep a secondary stack representing min values seen, or store Node pairs.",
    "javaCode": "class MinStack {\n    private java.util.Stack<Integer> stack = new java.util.Stack<>();\n    private java.util.Stack<Integer> minStack = new java.util.Stack<>();\n    public void push(int val) {\n        stack.push(val);\n        if (minStack.isEmpty() || val <= minStack.peek()) minStack.push(val);\n    }\n    public void pop() {\n        if (stack.peek().equals(minStack.peek())) minStack.pop();\n        stack.pop();\n    }\n    public int top() { return stack.peek(); }\n    public int getMin() { return minStack.peek(); }\n}"
  },
  {
    "id": "evaluate-reverse-polish-notation",
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "category": "Stack",
    "leetcodeUrl": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Evaluate value of RPN arithmetic expression.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Push numbers onto integer Stack, pop top two elements on operator, perform math, push result.",
    "javaCode": "class Solution {\n    public int evalRPN(String[] tokens) {\n        java.util.Stack<Integer> stack = new java.util.Stack<>();\n        for (String t : tokens) {\n            if (\"+-/\".contains(t)) {\n                int b = stack.pop(), a = stack.pop();\n                if (t.equals(\"+\")) stack.push(a + b);\n                else if (t.equals(\"-\")) stack.push(a - b);\n                else if (t.equals(\"\")) stack.push(a  b);\n                else stack.push(a / b);\n            } else {\n                stack.push(Integer.parseInt(t));\n            }\n        }\n        return stack.pop();\n    }\n}"
  },
  {
    "id": "basic-calculator",
    "title": "Basic Calculator",
    "difficulty": "Hard",
    "category": "Stack",
    "leetcodeUrl": "https://leetcode.com/problems/basic-calculator/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Evaluate a string mathematical expression with addition, subtraction, parentheses.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Maintain result, sign, and push parenthetical sign states onto integer stack.",
    "javaCode": "class Solution {\n    public int calculate(String s) {\n        java.util.Stack<Integer> stack = new java.util.Stack<>();\n        int res = 0, num = 0, sign = 1;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (Character.isDigit(c)) {\n                num = num  10 + (c - '0');\n            } else if (c == '+') {\n                res += sign  num;\n                num = 0; sign = 1;\n            } else if (c == '-') {\n                res += sign  num;\n                num = 0; sign = -1;\n            } else if (c == '(') {\n                stack.push(res);\n                stack.push(sign);\n                res = 0; sign = 1;\n            } else if (c == ')') {\n                res += sign  num;\n                num = 0;\n                res = stack.pop(); // sign\n                res += stack.pop(); // value before parenthesis\n            }\n        }\n        res += sign  num;\n        return res;\n    }\n}"
  },
  {
    "id": "linked-list-cycle",
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if linked list contains a cycle.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Floyd's Tortoise and Hare: slow pointer advances 1 step, fast advances 2 steps. Cycle if they meet.",
    "javaCode": "public class Solution {\n    public boolean hasCycle(ListNode head) {\n        if (head == null || head.next == null) return false;\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n}"
  },
  {
    "id": "add-two-numbers",
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/add-two-numbers/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Sum two numbers represented as reverse linked lists.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Iteratively sum digit values along lists, handling carry values using simple modulo arithmetic.",
    "javaCode": "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        int carry = 0;\n        while (l1 != null || l2 != null || carry > 0) {\n            int sum = carry;\n            if (l1 != null) { sum += l1.val; l1 = l1.next; }\n            if (l2 != null) { sum += l2.val; l2 = l2.next; }\n            carry = sum / 10;\n            cur.next = new ListNode(sum % 10);\n            cur = cur.next;\n        }\n        return dummy.next;\n    }\n}"
  },
  {
    "id": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Merge two sorted linked lists into one.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N + M)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Linear node-linking walk using a dummy head node.",
    "javaCode": "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(0);\n        ListNode tail = dummy;\n        while (list1 != null && list2 != null) {\n            if (list1.val < list2.val) { tail.next = list1; list1 = list1.next; }\n            else { tail.next = list2; list2 = list2.next; }\n            tail = tail.next;\n        }\n        tail.next = (list1 != null) ? list1 : list2;\n        return dummy.next;\n    }\n}"
  },
  {
    "id": "copy-list-with-random-pointer",
    "title": "Copy List with Random Pointer",
    "difficulty": "Medium",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/copy-list-with-random-pointer/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Clone a list containing arbitrary random pointer links.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Interleave copy nodes inside original list, clone random pointers, separate lists.",
    "javaCode": "class Solution {\n    public Node copyRandomList(Node head) {\n        if (head == null) return null;\n        Node cur = head;\n        while (cur != null) {\n            Node copy = new Node(cur.val);\n            copy.next = cur.next;\n            cur.next = copy;\n            cur = copy.next;\n        }\n        cur = head;\n        while (cur != null) {\n            if (cur.random != null) cur.next.random = cur.random.next;\n            cur = cur.next.next;\n        }\n        cur = head;\n        Node dummy = new Node(0), copyTail = dummy;\n        while (cur != null) {\n            copyTail.next = cur.next;\n            copyTail = copyTail.next;\n            cur.next = copyTail.next;\n            cur = cur.next;\n        }\n        return dummy.next;\n    }\n}"
  },
  {
    "id": "reverse-linked-list-ii",
    "title": "Reverse Linked List II",
    "difficulty": "Medium",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Reverse linked list nodes from position left to right.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Find left position node, reverse inner links up to right index.",
    "javaCode": "class Solution {\n    public ListNode reverseBetween(ListNode head, int left, int right) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode prev = dummy;\n        for (int i = 0; i < left - 1; i++) prev = prev.next;\n        ListNode cur = prev.next;\n        for (int i = 0; i < right - left; i++) {\n            ListNode temp = cur.next;\n            cur.next = temp.next;\n            temp.next = prev.next;\n            prev.next = temp;\n        }\n        return dummy.next;\n    }\n}"
  },
  {
    "id": "reverse-nodes-in-k-group",
    "title": "Reverse Nodes in k-Group",
    "difficulty": "Hard",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Reverse linked list nodes in groups of size k.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Count nodes size, reverse sections of length k, link boundaries.",
    "javaCode": "class Solution {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        ListNode dummy = new ListNode(0), prev = dummy;\n        dummy.next = head;\n        while (true) {\n            ListNode temp = prev;\n            for (int i = 0; i < k && temp != null; i++) temp = temp.next;\n            if (temp == null) break;\n            ListNode cur = prev.next, next = cur.next;\n            for (int i = 0; i < k - 1; i++) {\n                cur.next = next.next;\n                next.next = prev.next;\n                prev.next = next;\n                next = cur.next;\n            }\n            prev = cur;\n        }\n        return dummy.next;\n    }\n}"
  },
  {
    "id": "remove-nth-node-from-end-of-list",
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Remove the nth node from the end of the list.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Two pointers fast and slow: advance fast pointer n steps ahead first, then slide both.",
    "javaCode": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode slow = dummy, fast = dummy;\n        for (int i = 0; i <= n; i++) fast = fast.next;\n        while (fast != null) {\n            slow = slow.next;\n            fast = fast.next;\n        }\n        slow.next = slow.next.next;\n        return dummy.next;\n    }\n}"
  },
  {
    "id": "remove-duplicates-from-sorted-list-ii",
    "title": "Remove Duplicates from Sorted List II",
    "difficulty": "Medium",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Remove all duplicate node occurrences entirely.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Dummy nodes linear checks, tracking duplicate matches and skipping sub-sections.",
    "javaCode": "class Solution {\n    public ListNode deleteDuplicates(ListNode head) {\n        ListNode dummy = new ListNode(0), prev = dummy;\n        dummy.next = head;\n        while (prev.next != null && prev.next.next != null) {\n            if (prev.next.val == prev.next.next.val) {\n                int val = prev.next.val;\n                while (prev.next != null && prev.next.val == val) {\n                    prev.next = prev.next.next;\n                }\n            } else {\n                prev = prev.next;\n            }\n        }\n        return dummy.next;\n    }\n}"
  },
  {
    "id": "rotate-list",
    "title": "Rotate List",
    "difficulty": "Medium",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/rotate-list/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Rotate linked list right by k steps.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Connect list end to head, calculate modulo k offsets, break connection at length - k.",
    "javaCode": "class Solution {\n    public ListNode rotateRight(ListNode head, int k) {\n        if (head == null || head.next == null || k == 0) return head;\n        int len = 1;\n        ListNode tail = head;\n        while (tail.next != null) { tail = tail.next; len++; }\n        tail.next = head;\n        k = k % len;\n        for (int i = 0; i < len - k; i++) tail = tail.next;\n        head = tail.next;\n        tail.next = null;\n        return head;\n    }\n}"
  },
  {
    "id": "partition-list",
    "title": "Partition List",
    "difficulty": "Medium",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/partition-list/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Partition list nodes around a threshold value x.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Create two dummy list nodes for items less than x, and items greater than/equal to x, merge them.",
    "javaCode": "class Solution {\n    public ListNode partition(ListNode head, int x) {\n        ListNode l1 = new ListNode(0), l2 = new ListNode(0);\n        ListNode c1 = l1, c2 = l2;\n        while (head != null) {\n            if (head.val < x) { c1.next = head; c1 = c1.next; }\n            else { c2.next = head; c2 = c2.next; }\n            head = head.next;\n        }\n        c2.next = null;\n        c1.next = l2.next;\n        return l1.next;\n    }\n}"
  },
  {
    "id": "lru-cache",
    "title": "LRU Cache",
    "difficulty": "Medium",
    "category": "Linked List",
    "leetcodeUrl": "https://leetcode.com/problems/lru-cache/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Design a Least Recently Used Cache in O(1) time.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(1)",
      "space": "O(C)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Combine a doubly linked list representing insertion recency with a HashMap for lookup.",
    "javaCode": "class LRUCache {\n    class Node { int k, v; Node prev, next; Node(int k, int v) { this.k = k; this.v = v; } }\n    private java.util.Map<Integer, Node> map = new java.util.HashMap<>();\n    private Node head = new Node(0, 0), tail = new Node(0, 0);\n    private int capacity;\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        head.next = tail; tail.prev = head;\n    }\n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        Node n = map.get(key);\n        remove(n); insert(n);\n        return n.v;\n    }\n    public void put(int key, int value) {\n        if (map.containsKey(key)) remove(map.get(key));\n        if (map.size() == capacity) {\n            map.remove(tail.prev.k);\n            remove(tail.prev);\n        }\n        Node n = new Node(key, value);\n        insert(n); map.put(key, n);\n    }\n    private void remove(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }\n    private void insert(Node n) { n.next = head.next; n.next.prev = n; head.next = n; n.prev = head; }\n}"
  },
  {
    "id": "maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find the maximum depth of a binary tree.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Simple DFS recursively returning 1 + max of left and right branch heights.",
    "javaCode": "class Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n}"
  },
  {
    "id": "same-tree",
    "title": "Same Tree",
    "difficulty": "Easy",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/same-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if two binary trees are identical.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Recursive preorder traversal comparing structural values of matching nodes.",
    "javaCode": "class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        if (p == null && q == null) return true;\n        if (p == null || q == null || p.val != q.val) return false;\n        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n    }\n}"
  },
  {
    "id": "invert-binary-tree",
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/invert-binary-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Flip binary tree left and right branches recursively.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Swap left and right children recursively for all tree nodes.",
    "javaCode": "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        if (root == null) return null;\n        TreeNode temp = root.left;\n        root.left = invertTree(root.right);\n        root.right = invertTree(temp);\n        return root;\n    }\n}"
  },
  {
    "id": "symmetric-tree",
    "title": "Symmetric Tree",
    "difficulty": "Easy",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/symmetric-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Determine if a binary tree is symmetric.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Recursive symmetry check: compare left-left child branch to right-right child branch.",
    "javaCode": "class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        return root == null || isMirror(root.left, root.right);\n    }\n    private boolean isMirror(TreeNode t1, TreeNode t2) {\n        if (t1 == null && t2 == null) return true;\n        if (t1 == null || t2 == null || t1.val != t2.val) return false;\n        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n    }\n}"
  },
  {
    "id": "path-sum",
    "title": "Path Sum",
    "difficulty": "Easy",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/path-sum/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if target sum exists from root to leaf node values path.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "DFS subtraction recursion: subtract node values along branch paths, return true if leaf equals 0.",
    "javaCode": "class Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        if (root == null) return false;\n        if (root.left == null && root.right == null && targetSum == root.val) return true;\n        return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);\n    }\n}"
  },
  {
    "id": "sum-root-to-leaf-numbers",
    "title": "Sum Root to Leaf Numbers",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Sum numbers formed along paths from root to leaf.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Accumulate values during recursive descent, return accumulated sums at leaf nodes.",
    "javaCode": "class Solution {\n    public int sumNumbers(TreeNode root) {\n        return sum(root, 0);\n    }\n    private int sum(TreeNode n, int current) {\n        if (n == null) return 0;\n        current = current  10 + n.val;\n        if (n.left == null && n.right == null) return current;\n        return sum(n.left, current) + sum(n.right, current);\n    }\n}"
  },
  {
    "id": "binary-tree-maximum-path-sum",
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find the maximum path sum of arbitrary node sequences in a binary tree.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Compute maximum left/right paths recursively, updating overall globally stored value with splits.",
    "javaCode": "class Solution {\n    private int max = Integer.MIN_VALUE;\n    public int maxPathSum(TreeNode root) {\n        gain(root); return max;\n    }\n    private int gain(TreeNode n) {\n        if (n == null) return 0;\n        int l = Math.max(0, gain(n.left));\n        int r = Math.max(0, gain(n.right));\n        max = Math.max(max, n.val + l + r);\n        return n.val + Math.max(l, r);\n    }\n}"
  },
  {
    "id": "lowest-common-ancestor-of-a-binary-tree",
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find lowest common ancestor node.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Recursive branch matching: check left and right paths. LCA identified if left and right matches.",
    "javaCode": "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        if (root == null || root == p || root == q) return root;\n        TreeNode left = lowestCommonAncestor(root.left, p, q);\n        TreeNode right = lowestCommonAncestor(root.right, p, q);\n        if (left != null && right != null) return root;\n        return left != null ? left : right;\n    }\n}"
  },
  {
    "id": "binary-tree-right-side-view",
    "title": "Binary Tree Right Side View",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-right-side-view/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Retrieve list of nodes visible from right side view.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(W)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Reverse preorder BFS (Node, Right, Left) or queue tracking level markers.",
    "javaCode": "class Solution {\n    public java.util.List<Integer> rightSideView(TreeNode root) {\n        java.util.List<Integer> res = new java.util.ArrayList<>();\n        view(root, res, 0); return res;\n    }\n    private void view(TreeNode n, java.util.List<Integer> res, int d) {\n        if (n == null) return;\n        if (d == res.size()) res.add(n.val);\n        view(n.right, res, d + 1);\n        view(n.left, res, d + 1);\n    }\n}"
  },
  {
    "id": "average-of-levels-in-binary-tree",
    "title": "Average of Levels in Binary Tree",
    "difficulty": "Easy",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/average-of-levels-in-binary-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Compute average values of nodes on each level.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(W)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Standard queue-based BFS layer scanning, averaging node values level-by-level.",
    "javaCode": "class Solution {\n    public java.util.List<Double> averageOfLevels(TreeNode root) {\n        java.util.List<Double> res = new java.util.ArrayList<>();\n        if (root == null) return res;\n        java.util.Queue<TreeNode> q = new java.util.LinkedList<>();\n        q.add(root);\n        while (!q.isEmpty()) {\n            int size = q.size();\n            double sum = 0;\n            for (int i = 0; i < size; i++) {\n                TreeNode n = q.poll();\n                sum += n.val;\n                if (n.left != null) q.add(n.left);\n                if (n.right != null) q.add(n.right);\n            }\n            res.add(sum / size);\n        }\n        return res;\n    }\n}"
  },
  {
    "id": "binary-tree-level-order-traversal",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Traverse binary tree level-by-level in arrays.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(W)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Queue-based BFS keeping array lists of node values on each level queue.",
    "javaCode": "class Solution {\n    public java.util.List<java.util.List<Integer>> levelOrder(TreeNode root) {\n        java.util.List<java.util.List<Integer>> res = new java.util.ArrayList<>();\n        if (root == null) return res;\n        java.util.Queue<TreeNode> q = new java.util.LinkedList<>();\n        q.add(root);\n        while (!q.isEmpty()) {\n            int size = q.size();\n            java.util.List<Integer> level = new java.util.ArrayList<>();\n            for (int i = 0; i < size; i++) {\n                TreeNode n = q.poll();\n                level.add(n.val);\n                if (n.left != null) q.add(n.left);\n                if (n.right != null) q.add(n.right);\n            }\n            res.add(level);\n        }\n        return res;\n    }\n}"
  },
  {
    "id": "minimum-absolute-difference-in-bst",
    "title": "Minimum Absolute Difference in BST",
    "difficulty": "Easy",
    "category": "Binary Search Tree",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-absolute-difference-in-bst/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find the minimum absolute difference between any two nodes.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "In-order traversal records ascending sequence values, compute minimum difference.",
    "javaCode": "class Solution {\n    private int min = Integer.MAX_VALUE;\n    private Integer prev = null;\n    public int getMinimumDifference(TreeNode root) {\n        inOrder(root); return min;\n    }\n    private void inOrder(TreeNode n) {\n        if (n == null) return;\n        inOrder(n.left);\n        if (prev != null) min = Math.min(min, n.val - prev);\n        prev = n.val;\n        inOrder(n.right);\n    }\n}"
  },
  {
    "id": "kth-smallest-element-in-a-bst",
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "category": "Binary Search Tree",
    "leetcodeUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Identify the kth smallest element value in a BST.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(H + K)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Early stopping in-order recursive/iterative traversal tracking decreasing counts.",
    "javaCode": "class Solution {\n    private int count = 0, res = 0;\n    public int kthSmallest(TreeNode root, int k) {\n        count = k; search(root); return res;\n    }\n    private void search(TreeNode n) {\n        if (n == null) return;\n        search(n.left);\n        if (--count == 0) { res = n.val; return; }\n        search(n.right);\n    }\n}"
  },
  {
    "id": "validate-binary-search-tree",
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "category": "Binary Search Tree",
    "leetcodeUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Validate a binary search tree's structure constraints.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "DFS recursive helper using boundary values (min, max) to validate subtrees.",
    "javaCode": "class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return check(root, null, null);\n    }\n    private boolean check(TreeNode n, Integer min, Integer max) {\n        if (n == null) return true;\n        if ((min != null && n.val <= min) || (max != null && n.val >= max)) return false;\n        return check(n.left, min, n.val) && check(n.right, n.val, max);\n    }\n}"
  },
  {
    "id": "number-of-islands",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "category": "Graph / BFS / DFS",
    "leetcodeUrl": "https://leetcode.com/problems/number-of-islands/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Count the number of islands in a 2D grid.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(RC)",
      "space": "O(RC)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Run recursive DFS on discovering '1' to sink the entire island (set connected land to '0').",
    "javaCode": "class Solution {\n    public int numIslands(char[][] grid) {\n        int count = 0;\n        for (int i = 0; i < grid.length; i++) {\n            for (int j = 0; j < grid[0].length; j++) {\n                if (grid[i][j] == '1') {\n                    count++;\n                    sink(grid, i, j);\n                }\n            }\n        }\n        return count;\n    }\n    private void sink(char[][] grid, int i, int j) {\n        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == '0') return;\n        grid[i][j] = '0';\n        sink(grid, i + 1, j); sink(grid, i - 1, j);\n        sink(grid, i, j + 1); sink(grid, i, j - 1);\n    }\n}"
  },
  {
    "id": "surrounded-regions",
    "title": "Surrounded Regions",
    "difficulty": "Medium",
    "category": "Graph / BFS / DFS",
    "leetcodeUrl": "https://leetcode.com/problems/surrounded-regions/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Capture surrounded grid regions in-place.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(RC)",
      "space": "O(RC)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "DFS border scanning: mark 'O's linked to grid boundaries as safe, convert remaining 'O's to 'X's.",
    "javaCode": "class Solution {\n    public void solve(char[][] board) {\n        int r = board.length, c = board[0].length;\n        for (int i = 0; i < r; i++) { mark(board, i, 0); mark(board, i, c - 1); }\n        for (int j = 0; j < c; j++) { mark(board, 0, j); mark(board, r - 1, j); }\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                if (board[i][j] == 'O') board[i][j] = 'X';\n                else if (board[i][j] == 'S') board[i][j] = 'O';\n            }\n        }\n    }\n    private void mark(char[][] board, int i, int j) {\n        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != 'O') return;\n        board[i][j] = 'S';\n        mark(board, i+1, j); mark(board, i-1, j);\n        mark(board, i, j+1); mark(board, i, j-1);\n    }\n}"
  },
  {
    "id": "course-schedule",
    "title": "Course Schedule",
    "difficulty": "Medium",
    "category": "Graph / BFS / DFS",
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Verify courses sequence has no cyclic prerequisites.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(V + E)",
      "space": "O(V + E)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "DFS cycle detection using recursion stack arrays or BFS topological sorting (Kahn's).",
    "javaCode": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        java.util.List<java.util.List<Integer>> adj = new java.util.ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new java.util.ArrayList<>());\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n        java.util.Queue<Integer> q = new java.util.LinkedList<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.add(i);\n        int count = 0;\n        while (!q.isEmpty()) {\n            int node = q.poll(); count++;\n            for (int next : adj.get(node)) {\n                if (--inDegree[next] == 0) q.add(next);\n            }\n        }\n        return count == numCourses;\n    }\n}"
  },
  {
    "id": "search-insert-position",
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/search-insert-position/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find target insertion position in sorted array in O(log N).\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(log N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Classic binary search: return left index pointer as result boundary if element not found.",
    "javaCode": "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return l;\n    }\n}"
  },
  {
    "id": "search-a-2d-matrix",
    "title": "Search a 2D Matrix",
    "difficulty": "Medium",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Search for target value in 2D sorted grid matrix.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(log(RC))",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Treat 2D grid as a single flat array: index coordinates are row = mid / C, col = mid % C.",
    "javaCode": "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        int r = matrix.length, c = matrix[0].length;\n        int l = 0, right = r  c - 1;\n        while (l <= right) {\n            int mid = l + (right - l) / 2;\n            int val = matrix[mid / c][mid % c];\n            if (val == target) return true;\n            if (val < target) l = mid + 1;\n            else right = mid - 1;\n        }\n        return false;\n    }\n}"
  },
  {
    "id": "search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Search for target in rotated sorted array in O(log N).\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(log N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Binary search with rotational offset validation: assess sorted halves to shrink indices.",
    "javaCode": "class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n}"
  },
  {
    "id": "kth-largest-element-in-an-array",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find Kth largest element in O(N log K).\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N log K)",
      "space": "O(K)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Maintain a Min-Heap of size K. Smaller values are ejected, leaving largest elements.",
    "javaCode": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        java.util.PriorityQueue<Integer> pq = new java.util.PriorityQueue<>();\n        for (int num : nums) {\n            pq.add(num);\n            if (pq.size() > k) pq.poll();\n        }\n        return pq.peek();\n    }\n}"
  },
  {
    "id": "single-number",
    "title": "Single Number",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "leetcodeUrl": "https://leetcode.com/problems/single-number/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find the element that appears only once where others appear twice.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "XOR accumulation: identical values cancel out to zero (A ^ A = 0), leaving the single value.",
    "javaCode": "class Solution {\n    public int singleNumber(int[] nums) {\n        int xor = 0;\n        for (int num : nums) xor ^= num;\n        return xor;\n    }\n}"
  },
  {
    "id": "number-of-1-bits",
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "leetcodeUrl": "https://leetcode.com/problems/number-of-1-bits/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Count the number of set bits (1s) in integer's binary representation.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Brian Kernighan's Algorithm: clear lowest set bit iteratively using n & (n - 1).",
    "javaCode": "class Solution {\n    public int hammingWeight(int n) {\n        int count = 0;\n        while (n != 0) {\n            n &= (n - 1);\n            count++;\n        }\n        return count;\n    }\n}"
  },
  {
    "id": "palindrome-number",
    "title": "Palindrome Number",
    "difficulty": "Easy",
    "category": "Math",
    "leetcodeUrl": "https://leetcode.com/problems/palindrome-number/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Check if integer digits are a palindrome.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(log N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Reverse digit integers mathematically (using modulo %10) and compare values.",
    "javaCode": "class Solution {\n    public boolean isPalindrome(int x) {\n        if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n        int revertedNumber = 0;\n        while (x > revertedNumber) {\n            revertedNumber = revertedNumber  10 + x % 10;\n            x /= 10;\n        }\n        return x == revertedNumber || x == revertedNumber / 10;\n    }\n}"
  },
  {
    "id": "sqrtx",
    "title": "Sqrt(x)",
    "difficulty": "Easy",
    "category": "Math",
    "leetcodeUrl": "https://leetcode.com/problems/sqrtx/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Compute square root of x.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(log N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Perform binary search from 1 to x using mid <= x/mid division to prevent overflow.",
    "javaCode": "class Solution {\n    public int mySqrt(int x) {\n        if (x == 0) return 0;\n        int l = 1, r = x;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (mid <= x / mid && (mid + 1) > x / (mid + 1)) return mid;\n            if (mid > x / mid) r = mid - 1;\n            else l = mid + 1;\n        }\n        return l;\n    }\n}"
  },
  {
    "id": "climbing-stairs",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "category": "1D DP",
    "leetcodeUrl": "https://leetcode.com/problems/climbing-stairs/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find distinct ways to climb stairs.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Fibonacci sequence dynamic state updates: ways[i] = ways[i-1] + ways[i-2].",
    "javaCode": "class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int first = 1, second = 2;\n        for (int i = 3; i <= n; i++) {\n            int third = first + second;\n            first = second;\n            second = third;\n        }\n        return second;\n    }\n}"
  },
  {
    "id": "house-robber",
    "title": "House Robber",
    "difficulty": "Medium",
    "category": "1D DP",
    "leetcodeUrl": "https://leetcode.com/problems/house-robber/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Maximize rob capacity without robbing adjacent houses.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Dynamic programming: track max profit robbing or skipping current houses.",
    "javaCode": "class Solution {\n    public int rob(int[] nums) {\n        int rob = 0, skip = 0;\n        for (int num : nums) {\n            int temp = Math.max(skip + num, rob);\n            skip = rob;\n            rob = temp;\n        }\n        return rob;\n    }\n}"
  },
  {
    "id": "coin-change",
    "title": "Coin Change",
    "difficulty": "Medium",
    "category": "1D DP",
    "leetcodeUrl": "https://leetcode.com/problems/coin-change/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find minimum coins needed to make amount.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(C  A)",
      "space": "O(A)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Dynamic programming memoization: build coins counts array up to target amount.",
    "javaCode": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        java.util.Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}"
  },
  {
    "id": "longest-palindromic-substring",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "description": "Find the longest palindromic substring.\n\nConcrete Scenario Example:\nInput: Standard DSA interview test values.\nAlgorithm Flow: Optimize memory operations using optimal Java solutions.\nVisual Analogy: Reorganizing data nodes in-place directly without allocation overhead.",
    "optimalComplexity": {
      "time": "O(N^2)",
      "space": "O(1)"
    },
    "bruteForceComplexity": {
      "time": "O(N^2)",
      "space": "O(N)"
    },
    "optimizationPath": "Expand outward from each character index as centers (checking odd/even palindrome spans).",
    "javaCode": "class Solution {\n    public String longestPalindrome(String s) {\n        if (s == null || s.isEmpty()) return \"\";\n        int start = 0, end = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int len1 = expand(s, i, i);\n            int len2 = expand(s, i, i + 1);\n            int len = Math.max(len1, len2);\n            if (len > end - start) {\n                start = i - (len - 1) / 2;\n                end = i + len / 2;\n            }\n        }\n        return s.substring(start, end + 1);\n    }\n    private int expand(String s, int left, int right) {\n        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n            left--; right++;\n        }\n        return right - left - 1;\n    }\n}"
  },
  {
    "id": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Construct Binary Tree from Preorder and Inorder Traversal using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "construct-binary-tree-from-inorder-and-postorder-traversal",
    "title": "Construct Binary Tree from Inorder and Postorder Traversal",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Construct Binary Tree from Inorder and Postorder Traversal using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "populating-next-right-pointers-in-each-node-ii",
    "title": "Populating Next Right Pointers in Each Node II",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Populating Next Right Pointers in Each Node II using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "flatten-binary-tree-to-linked-list",
    "title": "Flatten Binary Tree to Linked List",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Flatten Binary Tree to Linked List using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "binary-search-tree-iterator",
    "title": "Binary Tree BST Iterator",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/binary-search-tree-iterator/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Binary Tree BST Iterator using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "count-complete-tree-nodes",
    "title": "Count Complete Tree Nodes",
    "difficulty": "Easy",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/count-complete-tree-nodes/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Count Complete Tree Nodes using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "binary-tree-zigzag-level-order-traversal",
    "title": "Binary Tree Zigzag Level Order Traversal",
    "difficulty": "Medium",
    "category": "Binary Tree",
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Binary Tree Zigzag Level Order Traversal using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "clone-graph",
    "title": "Clone Graph",
    "difficulty": "Medium",
    "category": "Graph / BFS / DFS",
    "leetcodeUrl": "https://leetcode.com/problems/clone-graph/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Clone Graph using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "evaluate-division",
    "title": "Evaluate Division",
    "difficulty": "Medium",
    "category": "Graph / BFS / DFS",
    "leetcodeUrl": "https://leetcode.com/problems/evaluate-division/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Evaluate Division using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "course-schedule-ii",
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "category": "Graph / BFS / DFS",
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Course Schedule II using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "snakes-and-ladders",
    "title": "Snakes and Ladders",
    "difficulty": "Medium",
    "category": "Graph / BFS / DFS",
    "leetcodeUrl": "https://leetcode.com/problems/snakes-and-ladders/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Snakes and Ladders using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "minimum-genetic-mutation",
    "title": "Minimum Genetic Mutation",
    "difficulty": "Medium",
    "category": "Graph / BFS / DFS",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-genetic-mutation/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Minimum Genetic Mutation using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "word-ladder",
    "title": "Word Ladder",
    "difficulty": "Hard",
    "category": "Graph / BFS / DFS",
    "leetcodeUrl": "https://leetcode.com/problems/word-ladder/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Word Ladder using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "implement-trie-prefix-tree",
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "Medium",
    "category": "Trie",
    "leetcodeUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Implement Trie (Prefix Tree) using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "design-add-and-search-words-data-structure",
    "title": "Design Add and Search Words Data Structure",
    "difficulty": "Medium",
    "category": "Trie",
    "leetcodeUrl": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Design Add and Search Words Data Structure using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "word-search-ii",
    "title": "Word Search II",
    "difficulty": "Hard",
    "category": "Trie",
    "leetcodeUrl": "https://leetcode.com/problems/word-search-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Word Search II using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "letter-combinations-of-a-phone-number",
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "category": "Backtracking",
    "leetcodeUrl": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Letter Combinations of a Phone Number using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "combinations",
    "title": "Combinations",
    "difficulty": "Medium",
    "category": "Backtracking",
    "leetcodeUrl": "https://leetcode.com/problems/combinations/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Combinations using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "permutations",
    "title": "Permutations",
    "difficulty": "Medium",
    "category": "Backtracking",
    "leetcodeUrl": "https://leetcode.com/problems/permutations/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Permutations using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "combination-sum",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "category": "Backtracking",
    "leetcodeUrl": "https://leetcode.com/problems/combination-sum/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Combination Sum using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "n-queens-ii",
    "title": "N-Queens II",
    "difficulty": "Hard",
    "category": "Backtracking",
    "leetcodeUrl": "https://leetcode.com/problems/n-queens-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve N-Queens II using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "generate-parentheses",
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "category": "Backtracking",
    "leetcodeUrl": "https://leetcode.com/problems/generate-parentheses/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Generate Parentheses using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "word-search",
    "title": "Word Search",
    "difficulty": "Medium",
    "category": "Backtracking",
    "leetcodeUrl": "https://leetcode.com/problems/word-search/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Word Search using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "convert-sorted-array-to-binary-search-tree",
    "title": "Convert Sorted Array to Binary Search Tree",
    "difficulty": "Easy",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Convert Sorted Array to Binary Search Tree using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "sort-list",
    "title": "Sort List",
    "difficulty": "Medium",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/sort-list/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Sort List using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "construct-quad-tree",
    "title": "Construct Quad Tree",
    "difficulty": "Medium",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/construct-quad-tree/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Construct Quad Tree using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "merge-k-sorted-lists",
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Merge k Sorted Lists using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "maximum-subarray",
    "title": "Maximum Subarray",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-subarray/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Maximum Subarray using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "maximum-sum-circular-subarray",
    "title": "Maximum Sum Circular Subarray",
    "difficulty": "Medium",
    "category": "Array / String",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-circular-subarray/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Maximum Sum Circular Subarray using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "find-peak-element",
    "title": "Find Peak Element",
    "difficulty": "Medium",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/find-peak-element/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Find Peak Element using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "find-first-and-last-position-of-element-in-sorted-array",
    "title": "Find First and Last Position of Element in Sorted Array",
    "difficulty": "Medium",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Find First and Last Position of Element in Sorted Array using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "find-minimum-in-rotated-sorted-array",
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Find Minimum in Rotated Sorted Array using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "category": "Binary Search",
    "leetcodeUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Median of Two Sorted Arrays using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "ipo",
    "title": "IPO",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "leetcodeUrl": "https://leetcode.com/problems/ipo/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve IPO using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "find-k-pairs-with-smallest-sums",
    "title": "Find K Pairs with Smallest Sums",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "leetcodeUrl": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Find K Pairs with Smallest Sums using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "find-median-from-data-stream",
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "leetcodeUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Find Median from Data Stream using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "add-binary",
    "title": "Add Binary",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "leetcodeUrl": "https://leetcode.com/problems/add-binary/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Add Binary using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "reverse-bits",
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "leetcodeUrl": "https://leetcode.com/problems/reverse-bits/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Reverse Bits using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "single-number-ii",
    "title": "Single Number II",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "leetcodeUrl": "https://leetcode.com/problems/single-number-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Single Number II using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "bitwise-and-of-numbers-range",
    "title": "Bitwise AND of Numbers Range",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "leetcodeUrl": "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Bitwise AND of Numbers Range using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "plus-one",
    "title": "Plus One",
    "difficulty": "Easy",
    "category": "Math",
    "leetcodeUrl": "https://leetcode.com/problems/plus-one/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Plus One using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "factorial-trailing-zeroes",
    "title": "Factorial Trailing Zeroes",
    "difficulty": "Medium",
    "category": "Math",
    "leetcodeUrl": "https://leetcode.com/problems/factorial-trailing-zeroes/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Factorial Trailing Zeroes using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "powx-n",
    "title": "Pow(x, n)",
    "difficulty": "Medium",
    "category": "Math",
    "leetcodeUrl": "https://leetcode.com/problems/powx-n/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Pow(x, n) using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "max-points-on-a-line",
    "title": "Max Points on a Line",
    "difficulty": "Hard",
    "category": "Math",
    "leetcodeUrl": "https://leetcode.com/problems/max-points-on-a-line/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Max Points on a Line using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "word-break",
    "title": "Word Break",
    "difficulty": "Medium",
    "category": "1D DP",
    "leetcodeUrl": "https://leetcode.com/problems/word-break/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Word Break using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "longest-increasing-subsequence",
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "category": "1D DP",
    "leetcodeUrl": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Longest Increasing Subsequence using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "triangle",
    "title": "Triangle",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "leetcodeUrl": "https://leetcode.com/problems/triangle/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Triangle using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "minimum-path-sum",
    "title": "Minimum Path Sum",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "leetcodeUrl": "https://leetcode.com/problems/minimum-path-sum/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Minimum Path Sum using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "unique-paths-ii",
    "title": "Unique Paths II",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "leetcodeUrl": "https://leetcode.com/problems/unique-paths-ii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Unique Paths II using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "interleaving-string",
    "title": "Interleaving String",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "leetcodeUrl": "https://leetcode.com/problems/interleaving-string/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Interleaving String using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "edit-distance",
    "title": "Edit Distance",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "leetcodeUrl": "https://leetcode.com/problems/edit-distance/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Edit Distance using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "best-time-to-buy-and-sell-stock-iii",
    "title": "Best Time to Buy and Sell Stock III",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Best Time to Buy and Sell Stock III using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "best-time-to-buy-and-sell-stock-iv",
    "title": "Best Time to Buy and Sell Stock IV",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Best Time to Buy and Sell Stock IV using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  },
  {
    "id": "maximal-square",
    "title": "Maximal Square",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "leetcodeUrl": "https://leetcode.com/problems/maximal-square/",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "description": "Solve Maximal Square using high-performance optimal Java structures.\n\nConcrete Scenario Example:\nInput: Standard arrays or node pointers.\nAlgorithm Flow: Scan linear sequences, optimizing transitions.\nVisual Analogy: Processing items smoothly along a linear conveyer belt."
  }
];

const TOPIC_RECALL_QA = {
  "Array / String": [
    {
      "q": "What is the core optimization technique for in-place array modifications?",
      "a": "Use the Two-Pointer technique (e.g. read/write pointers) to overwrite elements in a single linear scan O(N), achieving O(1) space."
    },
    {
      "q": "How does Boyer-Moore Voting Algorithm find the majority element in O(1) space?",
      "a": "It tracks a candidate and a counter. The counter increments on matching candidate and decrements on mismatch. This works because the majority element occurs > N/2 times."
    }
  ],
  "Two Pointers": [
    {
      "q": "When is the Two-Pointer approach ideal?",
      "a": "Ideal for searching pairs in sorted arrays, reversing sequences, or expanding palindrome centers."
    }
  ],
  "Sliding Window": [
    {
      "q": "Explain the difference between fixed and dynamic sliding windows.",
      "a": "Fixed windows maintain constant length. Dynamic windows expand right, then dynamically shrink left once valid criteria are met."
    }
  ],
  "HashMap / HashSet": [
    {
      "q": "What is the typical time-space trade-off of HashMaps?",
      "a": "They offer O(1) average lookup time at the cost of O(N) auxiliary space allocation."
    }
  ],
  "Intervals": [
    {
      "q": "What is the mandatory first step when solving interval problems?",
      "a": "Sort the intervals by their starting points (or ending points depending on the greedy constraint) to process intersections linearly."
    }
  ],
  "Stack": [
    {
      "q": "When should we use a Stack in string parsing?",
      "a": "Ideal for matching nested structures (like brackets or absolute paths) where the last seen open item is processed first (LIFO)."
    }
  ],
  "Linked List": [
    {
      "q": "What is the advantage of using a dummy head node in linked lists?",
      "a": "It simplifies edge cases by avoiding check parameters for empty/null lists or head node replacement transitions."
    }
  ],
  "Binary Tree": [
    {
      "q": "What is the typical recursion time-space complexity for Binary Trees?",
      "a": "Time: O(N) to visit nodes. Space: O(H) representing maximum call stack depth (height)."
    }
  ],
  "Binary Search Tree": [
    {
      "q": "What is the key mathematical property of BST in-order traversals?",
      "a": "An in-order traversal of a BST yields values in strictly increasing/sorted order."
    }
  ],
  "Graph / BFS / DFS": [
    {
      "q": "When should we choose BFS over DFS for grid matrices?",
      "a": "Choose BFS when searching for the shortest path or minimum mutation/level transformations."
    }
  ],
  "Binary Search": [
    {
      "q": "What are the requirements for applying binary search?",
      "a": "The search space must have a monotonic order (e.g. sorted arrays, boundary step thresholds)."
    }
  ],
  "Heap / Priority Queue": [
    {
      "q": "Why is a Min-Heap of size K preferred for finding the Kth largest element?",
      "a": "It processes N elements in O(N log K) time and O(K) space, keeping only the largest K items in memory."
    }
  ],
  "Bit Manipulation": [
    {
      "q": "What is the effect of n & (n - 1) in binary operators?",
      "a": "It clears the lowest/least-significant set bit (1) of integer n to 0."
    }
  ],
  "1D DP": [
    {
      "q": "What is the core difference between Memoization and Tabulation?",
      "a": "Memoization is top-down (recursion + cache). Tabulation is bottom-up (iterative array building)."
    }
  ],
  "Dynamic Programming": [
    {
      "q": "How do you identify a Dynamic Programming problem?",
      "a": "Look for overlapping subproblems and optimal substructure properties."
    }
  ]
};
