from collections import defaultdict, deque
from typing import List


def findCheapestPrice(n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    """
    Find the cheapest price from src to dst with at most k stops.
    
    Args:
        n: Number of cities
        flights: List of [from, to, price] representing flights
        src: Source city
        dst: Destination city
        k: Maximum number of stops allowed
        
    Returns:
        Cheapest price, or -1 if no route exists
    """
    # Build adjacency list
    graph = defaultdict(list)
    for from_city, to_city, price in flights:
        graph[from_city].append((to_city, price))
    
    # BFS with at most k stops
    # Queue stores: (current_city, current_cost, stops_used)
    queue = deque([(src, 0, 0)])
    
    # Track minimum cost to reach each city with a given number of stops
    # min_cost[city][stops] = minimum cost to reach city with exactly stops stops
    min_cost = [[float('inf')] * (k + 2) for _ in range(n)]
    min_cost[src][0] = 0
    
    cheapest = float('inf')
    
    while queue:
        current_city, current_cost, stops = queue.popleft()
        
        # If we've reached destination, update cheapest
        if current_city == dst:
            cheapest = min(cheapest, current_cost)
            continue
        
        # If we've used all allowed stops, skip
        if stops > k:
            continue
        
        # Explore neighbors
        for next_city, price in graph[current_city]:
            new_cost = current_cost + price
            
            # Only continue if this path is cheaper than previously found paths
            # to this city with this many stops
            if new_cost < min_cost[next_city][stops + 1]:
                min_cost[next_city][stops + 1] = new_cost
                queue.append((next_city, new_cost, stops + 1))
    
    return cheapest if cheapest != float('inf') else -1


def main():
    """Main entry point of the application."""
    print("Cheapest Flights Within K Stops - Solution")
    print("Run 'py test_main.py' to execute unit tests.\n")
    
    # Example usage
    n = 4
    flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
    src, dst, k = 0, 3, 1
    
    result = findCheapestPrice(n, flights, src, dst, k)
    print(f"Finding cheapest flight from city {src} to city {dst} with at most {k} stops")
    print(f"Result: {result}")


if __name__ == "__main__":
    main()
