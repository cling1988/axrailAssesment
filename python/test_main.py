import unittest
from main import findCheapestPrice


class TestCheapestFlights(unittest.TestCase):
    """Unit tests for the Cheapest Flights Within K Stops problem."""
    
    def test_example_1(self):
        """Test with 4 cities, maximum 1 stop."""
        n = 4
        flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
        src, dst, k = 0, 3, 1
        result = findCheapestPrice(n, flights, src, dst, k)
        self.assertEqual(result, 700)
    
    def test_example_2(self):
        """Test with 3 cities, maximum 1 stop."""
        n = 3
        flights = [[0,1,100],[1,2,100],[0,2,500]]
        src, dst, k = 0, 2, 1
        result = findCheapestPrice(n, flights, src, dst, k)
        self.assertEqual(result, 200)
    
    def test_no_valid_route(self):
        """Test when no valid route exists with 0 stops."""
        n = 3
        flights = [[0,1,100],[1,2,100]]
        src, dst, k = 0, 2, 0
        result = findCheapestPrice(n, flights, src, dst, k)
        self.assertEqual(result, -1)
    
    def test_direct_flight(self):
        """Test with direct flight available."""
        n = 2
        flights = [[0,1,100]]
        src, dst, k = 0, 1, 0
        result = findCheapestPrice(n, flights, src, dst, k)
        self.assertEqual(result, 100)
    
    def test_multiple_stops_allowed(self):
        """Test with multiple stops allowed."""
        n = 4
        flights = [[0,1,100],[1,2,100],[2,3,100]]
        src, dst, k = 0, 3, 2
        result = findCheapestPrice(n, flights, src, dst, k)
        self.assertEqual(result, 300)
    
    def test_source_equals_destination(self):
        """Test when source equals destination."""
        n = 3
        flights = [[0,1,100],[1,2,100]]
        src, dst, k = 0, 0, 1
        result = findCheapestPrice(n, flights, src, dst, k)
        self.assertEqual(result, 0)
    
    def test_no_flights(self):
        """Test with no flights available."""
        n = 3
        flights = []
        src, dst, k = 0, 2, 1
        result = findCheapestPrice(n, flights, src, dst, k)
        self.assertEqual(result, -1)
    
    def test_cheaper_path_with_more_stops(self):
        """Test choosing cheaper path within stop limit."""
        n = 4
        flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
        src, dst, k = 0, 3, 2
        result = findCheapestPrice(n, flights, src, dst, k)
        # With 2 stops allowed: 0->1->2->3 costs 100+100+200=400
        self.assertEqual(result, 400)


if __name__ == "__main__":
    unittest.main()
