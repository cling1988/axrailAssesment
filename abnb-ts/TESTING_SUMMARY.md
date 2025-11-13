# ✅ React Unit Testing - Complete Setup

## What Just Happened?

I've set up complete unit testing for your React application! Here's what was installed and configured:

### 📦 Installed Packages
- **vitest** - Modern, fast test runner (alternative to Jest)
- **@testing-library/react** - Tools for testing React components
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **@testing-library/user-event** - Simulate user interactions
- **jsdom** - Simulates browser environment in Node.js

### 📁 Files Created
1. `vitest.config.ts` - Test configuration
2. `src/test/setup.ts` - Test environment setup
3. `src/test/example.test.tsx` - Working example tests (✅ All passing!)
4. `src/components/Header.test.tsx` - Header component tests
5. `src/components/Hero.test.tsx` - Hero component tests
6. `src/components/Footer.test.tsx` - Footer component tests
7. `TESTING.md` - Comprehensive testing guide

### 🎯 npm Scripts Added
```json
{
  "test": "vitest",              // Run tests in watch mode
  "test:ui": "vitest --ui",       // Run with visual UI
  "test:coverage": "vitest --coverage"  // Generate coverage report
}
```

## 🚀 How to Run Tests

### Run All Tests (Watch Mode)
```bash
npm test
```
Tests will re-run automatically when you change files.

### Run Tests Once
```bash
npm test -- --run
```

### Run Specific Test File
```bash
npx vitest run example.test.tsx
```

### Run Tests with UI
```bash
npm run test:ui
```

## ✅ Working Example

I created `src/test/example.test.tsx` with **5 passing tests** that demonstrate:

1. ✓ Basic component rendering
2. ✓ Testing props
3. ✓ CSS class testing
4. ✓ Multiple element testing
5. ✓ Different query methods (getBy vs queryBy)

## 📖 How Unit Testing Works in React

### The Testing Process

```
1. ARRANGE  →  2. ACT  →  3. ASSERT
   Set up       Do          Check
   the test    something    result
```

### Example Test Structure

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should update when button clicked', async () => {
  // 1. ARRANGE: Setup
  const user = userEvent.setup();
  render(<MyComponent />);
  
  // 2. ACT: Perform action
  const button = screen.getByRole('button');
  await user.click(button);
  
  // 3. ASSERT: Check result
  expect(screen.getByText('Updated!')).toBeInTheDocument();
});
```

## 🔍 Query Elements (How to Find Things)

### Preferred Method: By Role (Best for Accessibility)
```tsx
screen.getByRole('button', { name: /submit/i })
screen.getByRole('heading', { name: /title/i })
screen.getByRole('textbox', { name: /email/i })
```

### By Text
```tsx
screen.getByText(/hello world/i)      // Finds text
screen.queryByText('Optional')        // Returns null if not found
await screen.findByText('Async')      // Waits for element
```

### By Label (Forms)
```tsx
screen.getByLabelText('Email')
screen.getByLabelText(/password/i)
```

### By Test ID (Last Resort)
```tsx
<div data-testid="custom-element" />
screen.getByTestId('custom-element')
```

## 👆 Testing User Interactions

```tsx
import userEvent from '@testing-library/user-event';

it('handles user actions', async () => {
  const user = userEvent.setup();
  render(<Form />);
  
  // Typing
  await user.type(screen.getByRole('textbox'), 'Hello');
  
  // Clicking
  await user.click(screen.getByRole('button'));
  
  // Selecting
  await user.selectOptions(screen.getByRole('combobox'), 'option1');
  
  // Checking
  await user.click(screen.getByRole('checkbox'));
});
```

## ✨ Common Matchers

```tsx
// Presence in DOM
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Visibility
expect(element).toBeVisible()

// Text
expect(element).toHaveTextContent('Hello')

// Attributes
expect(link).toHaveAttribute('href', '/home')
expect(button).toHaveClass('btn-primary')

// Form elements
expect(input).toHaveValue('John')
expect(checkbox).toBeChecked()
expect(button).toBeDisabled()
```

## 🎯 What to Test

### ✅ DO Test
- Component renders without errors
- Correct content displays based on props
- User interactions work (clicks, typing)
- Show/hide behavior (conditional rendering)
- Form submissions
- Error states and loading states

### ❌ DON'T Test
- Implementation details (internal state)
- Third-party library internals
- CSS styling details
- Exact HTML structure

## 📊 Example: Full Component Test

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('should submit form with email and password', async () => {
    // Setup
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    // Render
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // Interact
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Assert
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
  
  it('should show error when fields are empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);
    
    // Try to submit without filling fields
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Error should appear
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
```

## 🔄 Testing Async Operations

```tsx
import { waitFor } from '@testing-library/react';

it('should load and display data', async () => {
  render(<DataComponent />);
  
  // Wait for async element to appear
  const data = await screen.findByText('Loaded Data');
  expect(data).toBeInTheDocument();
  
  // Or use waitFor for complex conditions
  await waitFor(() => {
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

## 🎭 Mocking

```tsx
import { vi } from 'vitest';

// Mock a function
const mockFn = vi.fn();
mockFn('hello');
expect(mockFn).toHaveBeenCalledWith('hello');

// Mock a module
vi.mock('./api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mocked' })
}));

// Mock a component
vi.mock('./ComplexComponent', () => ({
  default: () => <div>Mocked Component</div>
}));
```

## 🐛 Debugging Tests

```tsx
// Print what's rendered
const { debug } = render(<Component />);
debug();  // Shows HTML in console

// Or
screen.debug();  // Shows current DOM state

// Find why a query fails
screen.getByRole('button');  // Error message shows available roles
```

## 📈 Test Coverage

```bash
npm run test:coverage
```

This generates a report showing:
- Which lines are tested
- Which branches are covered
- Overall percentage

Aim for:
- **70%+** overall coverage
- **100%** critical paths
- Focus on user-facing functionality

## 🎓 Best Practices

1. **Test Behavior, Not Implementation**
   ```tsx
   // ❌ Bad: Testing internal state
   expect(component.state.count).toBe(5);
   
   // ✅ Good: Testing what user sees
   expect(screen.getByText('Count: 5')).toBeInTheDocument();
   ```

2. **Use Accessible Queries**
   ```tsx
   // ❌ Bad
   container.querySelector('.button');
   
   // ✅ Good
   screen.getByRole('button', { name: /submit/i });
   ```

3. **Keep Tests Simple**
   - One test = one concept
   - Clear test names
   - Easy to understand

4. **Always Await User Events**
   ```tsx
   // ❌ Bad
   user.click(button);
   
   // ✅ Good
   await user.click(button);
   ```

## 📚 Additional Resources

- **Full Testing Guide**: See `TESTING.md` for comprehensive documentation
- **Working Examples**: Check `src/test/example.test.tsx`
- **Component Tests**: See `src/components/*.test.tsx` for real examples

## 🎉 Quick Start

1. **Run the working example:**
   ```bash
   npx vitest run example.test.tsx
   ```

2. **Start testing in watch mode:**
   ```bash
   npm test
   ```

3. **Write a test for your component:**
   ```tsx
   // src/components/MyComponent.test.tsx
   import { render, screen } from '@testing-library/react';
   import MyComponent from './MyComponent';
   
   describe('MyComponent', () => {
     it('should render', () => {
       render(<MyComponent />);
       expect(screen.getByText('Hello')).toBeInTheDocument();
     });
   });
   ```

## 📝 Summary

✅ **Setup Complete** - All testing tools installed and configured  
✅ **5 Working Tests** - Example tests passing successfully  
✅ **Documentation Ready** - Complete guide in TESTING.md  
✅ **Scripts Added** - npm test, test:ui, test:coverage  
✅ **Ready to Use** - Start writing tests for your components!

**Next Steps:**
1. Run `npm test` to see tests in action
2. Review `TESTING.md` for detailed examples
3. Write tests as you create new components
4. Aim for 70%+ coverage

Happy Testing! 🚀
