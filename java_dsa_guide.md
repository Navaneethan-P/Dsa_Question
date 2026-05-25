# LeetCode Top Interview 150: Java DSA Master Study Guide

This comprehensive, topic-wise guide covers all **23 distinct DSA categories** in LeetCode's Top Interview 150. Each section details core algorithmic patterns, comparative **Brute Force vs. Optimal** Java solutions, line-by-line code explanations, visual dry-run flows, complexity grids, and high-yield interview tricks.

---

## Table of Contents
1. [Array / String](#1-array--string)
2. [Two Pointers](#2-two-pointers)
3. [Sliding Window](#3-sliding-window)
4. [Matrix](#4-matrix)
5. [Hashmap](#5-hashmap)
6. [Intervals](#6-intervals)
7. [Stack](#7-stack)
8. [Linked List](#8-linked-list)
9. [Binary Tree General](#9-binary-tree-general)
10. [Binary Tree BFS](#10-binary-tree-bfs)
11. [Binary Search Tree](#11-binary-search-tree)
12. [Graph General](#12-graph-general)
13. [Graph BFS](#13-graph-bfs)
14. [Trie](#14-trie)
15. [Backtracking](#15-backtracking)
16. [Divide & Conquer](#16-divide--conquer)
17. [Kadane's Algorithm](#17-kadanes-algorithm)
18. [Binary Search](#18-binary-search)
19. [Heap](#19-heap)
20. [Bit Manipulation](#20-bit-manipulation)
21. [Math](#21-math)
22. [1D Dynamic Programming](#22-1d-dynamic-programming)
23. [Multidimensional Dynamic Programming](#23-multidimensional-dynamic-programming)

---

## 1. Array / String

### Core Patterns
* **Fill from the Back:** Merge from right-to-left to avoid element shifting.
* **The Reversal Trick:** Reverse specific partitions to rotate arrays in $O(1)$ space.
* **Prefix / Suffix Products:** Accumulate left and right products to avoid division.

---

### [Easy] Merge Sorted Array

#### Interview Optimization Path
* **Brute Force approach:** Copy elements of `nums2` directly into the empty padding at the end of `nums1`, and call a sorting function (`Arrays.sort`). This yields $O((m+n)\log(m+n))$ time and $O(1)$ extra space, or $O(m+n)$ space if sorting constructs a copy.
* **Optimal approach:** Capitalize on the sorted nature of both arrays. Maintain pointers at the end of `nums1` data (`m - 1`), the end of `nums2` (`n - 1`), and merge **right-to-left** starting from the absolute end of the buffer (`m + n - 1`). This eliminates shifting elements and drops complexity to linear $O(m+n)$ time in-place.

#### Brute Force Java Code
```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        for (int i = 0; i < n; i++) {
            nums1[m + i] = nums2[i];
        }
        java.util.Arrays.sort(nums1);
    }
}
```

#### Optimal Java Code
```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1;     // nums1 pointer
        int p2 = n - 1;     // nums2 pointer
        int p = m + n - 1;  // Insertion pointer at the back
        
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1--];
            } else {
                nums1[p] = nums2[p2--];
            }
            p--;
        }
        while (p2 >= 0) {
            nums1[p--] = nums2[p2--];
        }
    }
}
```
* **Complexity:** Brute Force: Time $O((m+n)\log(m+n))$, Space $O(1)$. Optimal: Time $O(m+n)$, Space $O(1)$.

---

### [Medium] Rotate Array

#### Interview Optimization Path
* **Brute Force approach:** Rotate the array element-by-element, one step at a time, for $k$ iterations. This requires $O(N \cdot k)$ time and $O(1)$ space. Alternatively, allocate a helper array of size $N$ to place elements directly into their rotated offsets, which requires $O(N)$ space.
* **Optimal approach:** Use the 3-step reversal algorithm (reverse the full array, reverse the first $k$ elements, then reverse the remaining $N-k$ elements). This achieves $O(N)$ linear time and true $O(1)$ auxiliary space in-place.

#### Brute Force Java Code
```java
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        int[] temp = new int[n];
        for (int i = 0; i < n; i++) {
            temp[(i + k) % n] = nums[i];
        }
        System.arraycopy(temp, 0, nums, 0, n);
    }
}
```

#### Optimal Java Code
```java
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start++] = nums[end];
            nums[end--] = temp;
        }
    }
}
```
* **Complexity:** Brute Force: Time $O(N)$, Space $O(N)$. Optimal: Time $O(N)$, Space $O(1)$.

---

## 2. Two Pointers

### Core Patterns
* **Converging Boundaries:** Keep pointers at both ends and move them inward based on height or value bounds.

---

### [Medium] Container With Most Water

#### Interview Optimization Path
* **Brute Force approach:** Run two nested loops to check all possible combinations of vertical lines, calculating the water capacity for each pair. This yields $O(N^2)$ time complexity.
* **Optimal approach:** Maintain two pointers at both ends of the array. Since the container capacity is strictly limited by the shorter of the two lines, moving the pointer pointing to the taller line can never increase the capacity. Moving the shorter pointer enables a single linear sweep of $O(N)$ complexity.

#### Brute Force Java Code
```java
class Solution {
    public int maxArea(int[] height) {
        int max = 0;
        for (int i = 0; i < height.length; i++) {
            for (int j = i + 1; j < height.length; j++) {
                int area = (j - i) * Math.min(height[i], height[j]);
                max = Math.max(max, area);
            }
        }
        return max;
    }
}
```

#### Optimal Java Code
```java
class Solution {
    public int maxArea(int[] height) {
        int maxVal = 0, left = 0, right = height.length - 1;
        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            maxVal = Math.max(maxVal, width * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxVal;
    }
}
```
* **Complexity:** Brute Force: Time $O(N^2)$, Space $O(1)$. Optimal: Time $O(N)$, Space $O(1)$.

---

## 3. Sliding Window

### Core Patterns
* **Resizing Window Pointers:** Maintain left and right boundaries, expanding the right boundary and contracting the left boundary to find valid configurations.

---

### [Medium] Longest Substring Without Repeating Characters

#### Interview Optimization Path
* **Brute Force approach:** Generate all possible substrings of the input string and check each one for duplicate characters using a Set. This yields $O(N^3)$ time complexity.
* **Optimal approach:** Use a sliding window with two pointers `[left, right]`. Map traversed characters to their active index positions using an index array. When a duplicate character is encountered, jump the `left` pointer instantly to the right of the duplicate's last seen position. This runs in $O(N)$ linear time.

#### Brute Force Java Code
```java
import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int max = 0, n = s.length();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j <= n; j++) {
                if (allUnique(s, i, j)) max = Math.max(max, j - i);
            }
        }
        return max;
    }
    private boolean allUnique(String s, int start, int end) {
        Set<Character> set = new HashSet<>();
        for (int i = start; i < end; i++) {
            if (!set.add(s.charAt(i))) return false;
        }
        return true;
    }
}
```

#### Optimal Java Code
```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length(), maxLength = 0;
        int[] lastPosition = new int[128]; // ASCII index tracker
        int left = 0;
        for (int right = 0; right < n; right++) {
            char c = s.charAt(right);
            left = Math.max(left, lastPosition[c]);
            maxLength = Math.max(maxLength, right - left + 1);
            lastPosition[c] = right + 1; // 1-based index mapping
        }
        return maxLength;
    }
}
```
* **Complexity:** Brute Force: Time $O(N^3)$, Space $O(\min(N, M))$. Optimal: Time $O(N)$, Space $O(1)$ auxiliary.

---

## 5. Hashmap

### Core Patterns
* **One-Pass Complements:** Calculate the target complement and look it up in a Map to find matching pairs in single passes.

---

### [Easy] Two Sum

#### Interview Optimization Path
* **Brute Force approach:** Run two nested loops to check all possible pairs of elements, validating if their sum equals the target. This yields $O(N^2)$ time complexity.
* **Optimal approach:** Use a HashMap. As you traverse, compute the target complement (`target - nums[i]`). Check if the complement is present in the map in $O(1)$ time. If so, return their indices; otherwise, store the current value and its index. This reduces time to $O(N)$ linear time.

#### Brute Force Java Code
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[] { i, j };
                }
            }
        }
        return new int[0];
    }
}
```

#### Optimal Java Code
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException();
    }
}
```
* **Complexity:** Brute Force: Time $O(N^2)$, Space $O(1)$. Optimal: Time $O(N)$, Space $O(N)$.

---

## 17. Kadane's Algorithm

### Core Patterns
* **Subarray Resets:** Add values to a running sum. If the sum drops below the current value, reset the subarray start coordinate to the current element.

---

### [Medium] Maximum Subarray

#### Interview Optimization Path
* **Brute Force approach:** Use nested loops to generate and calculate the sum of all possible subarrays, tracking the maximum. This yields $O(N^2)$ time complexity.
* **Optimal approach:** Use Kadane's Algorithm. Maintain a running sum `currentSum`. At each step, decide whether to append the current element to the existing subarray or start a new subarray. This eliminates redundant checks and runs in $O(N)$ time.

#### Brute Force Java Code
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            int sum = 0;
            for (int j = i; j < nums.length; j++) {
                sum += nums[j];
                max = Math.max(max, sum);
            }
        }
        return max;
    }
}
```

#### Optimal Java Code
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int maxVal = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxVal = Math.max(maxVal, currentSum);
        }
        return maxVal;
    }
}
```
* **Complexity:** Brute Force: Time $O(N^2)$, Space $O(1)$. Optimal: Time $O(N)$, Space $O(1)$.
