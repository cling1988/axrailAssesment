# React Unit Testing Guide

## Overview
This project uses **Vitest** and **React Testing Library** for unit testing React components.

## Setup Complete ✅
- ✅ Vitest (Test Runner)
- ✅ React Testing Library (Component Testing)
- ✅ @testing-library/jest-dom (DOM Matchers)
- ✅ @testing-library/user-event (User Interactions)
- ✅ jsdom (Browser Environment)

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (auto-rerun on changes)
```bash
npm test -- --watch
```

### Run tests with UI (interactive browser interface)
```bash
npm run test:ui
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run a specific test file
```bash
npm test Hero.test.tsx
```

## Test File Structure

Test files are located alongside the components they test:
```
src/
  components/
    Hero.tsx
    Hero.test.tsx    ← Test file
    Header.tsx
    Header.test.tsx  ← Test file
    Footer.tsx
    Footer.test.tsx  ← Test file
```

## Writing Tests - The Basics

### 1. Test Structure (AAA Pattern)
```tsx
it('should do something', () => {
  // Arrange: Setup test data
  const user = { name: 'John' };
  
  // Act: Perform the action
  render(<Component user={user} />);
  
  // Assert: Check the result
  expect(screen.getByText('John')).toBeInTheDocument();
});
```

### 2. Querying Elements

**By Role (Preferred - Accessibility-focused)**
```tsx
screen.getByRole('button', { name: /submit/i })
screen.getByRole('heading', { name: /welcome/i })
screen.getByRole('link', { name: /home/i })
```

**By Text**
```tsx
screen.getByText(/hello world/i)
screen.queryByText('Not found') // Returns null if not found
```

**By Test ID** (When role/text isn't suitable)
```tsx
<div data-testid="custom-element" />
screen.getByTestId('custom-element')
```

### 3. User Interactions

```tsx
import userEvent from '@testing-library/user-event';

it('should handle click', async () => {
  const user = userEvent.setup();
  render(<Button />);
  
  const button = screen.getByRole('button');
  await user.click(button);
  
  expect(button).toHaveClass('active');
});

it('should handle typing', async () => {
  const user = userEvent.setup();
  render(<Input />);
  
  const input = screen.getByRole('textbox');
  await user.type(input, 'Hello');
  
  expect(input).toHaveValue('Hello');
});
```

### 4. Testing Async Operations

```tsx
import { waitFor } from '@testing-library/react';

it('should load data', async () => {
  render(<DataComponent />);
  
  // Wait for element to appear
  const data = await screen.findByText('Loaded data');
  expect(data).toBeInTheDocument();
  
  // Or use waitFor for complex conditions
  await waitFor(() => {
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

### 5. Mocking Components

```tsx
import { vi } from 'vitest';

// Mock a child component
vi.mock('./ChildComponent', () => ({
  default: () => <div>Mocked Child</div>
}));

// Mock a function
const mockFn = vi.fn();
```

### 6. Testing Props

```tsx
it('should render with props', () => {
  render(<Greeting name="Alice" />);
  expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();
});
```

### 7. Testing Conditional Rendering

```tsx
it('should show message when logged in', () => {
  render(<Dashboard isLoggedIn={true} />);
  expect(screen.getByText('Welcome back')).toBeInTheDocument();
});

it('should not show message when logged out', () => {
  render(<Dashboard isLoggedIn={false} />);
  expect(screen.queryByText('Welcome back')).not.toBeInTheDocument();
});
```

## Common Matchers

```tsx
// DOM Presence
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Visibility
expect(element).toBeVisible()
expect(element).not.toBeVisible()

// Text Content
expect(element).toHaveTextContent('Hello')
expect(element).toContainHTML('<span>Hi</span>')

// Attributes
expect(element).toHaveAttribute('href', '/home')
expect(element).toHaveClass('active')

// Form Values
expect(input).toHaveValue('John')
expect(checkbox).toBeChecked()
expect(button).toBeDisabled()

// Equality
expect(value).toBe(5)
expect(object).toEqual({ name: 'John' })
expect(array).toContain('item')
```

## What to Test

### ✅ DO Test:
- **Component renders** without crashing
- **User interactions** (clicks, typing, form submissions)
- **Conditional rendering** (show/hide based on state/props)
- **Props handling** (correct display of data)
- **Accessibility** (proper roles, labels, keyboard navigation)
- **Error states** and loading states

### ❌ DON'T Test:
- Implementation details (internal state, private methods)
- Third-party library internals
- Styling specifics (unless critical to functionality)
- Browser APIs directly

## Example Test Patterns

### Testing a Button Click
```tsx
it('should call onClick when clicked', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();
  
  render(<Button onClick={handleClick}>Click me</Button>);
  
  await user.click(screen.getByRole('button'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing Form Submission
```tsx
it('should submit form with values', async () => {
  const handleSubmit = vi.fn();
  const user = userEvent.setup();
  
  render(<Form onSubmit={handleSubmit} />);
  
  await user.type(screen.getByLabelText('Name'), 'John');
  await user.type(screen.getByLabelText('Email'), 'john@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John',
    email: 'john@example.com'
  });
});
```

### Testing Modal Open/Close
```tsx
it('should open and close modal', async () => {
  const user = userEvent.setup();
  render(<ModalExample />);
  
  // Modal should be closed initially
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  
  // Open modal
  await user.click(screen.getByRole('button', { name: /open/i }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  
  // Close modal
  await user.click(screen.getByRole('button', { name: /close/i }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

## Tips for Better Tests

1. **Test behavior, not implementation**
   - ❌ Bad: Test if state variable changed
   - ✅ Good: Test if UI updated correctly

2. **Use accessible queries**
   - Prefer `getByRole`, `getByLabelText` over `getByTestId`
   - This ensures your app is accessible

3. **Keep tests simple and focused**
   - One test should test one thing
   - Use descriptive test names

4. **Avoid testing external libraries**
   - Mock them if needed
   - Trust they work correctly

5. **Use async/await properly**
   - User interactions are async
   - Always await user events

## Debugging Tests

### See what's rendered
```tsx
import { render, screen } from '@testing-library/react';

const { debug } = render(<Component />);
debug(); // Prints DOM to console
screen.debug(); // Also works
```

### Find why query fails
```tsx
screen.getByRole('button'); // Throws error with helpful message
screen.logTestingPlaygroundURL(); // Get Testing Playground URL
```

## CI/CD Integration

Add to your CI pipeline:
```yaml
- run: npm test -- --run
```

## Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [Vitest Docs](https://vitest.dev/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Playground](https://testing-playground.com/) - Interactive query builder

## Next Steps

1. Run the tests: `npm test`
2. Try modifying a component and watch tests update
3. Write tests for new components as you create them
4. Aim for at least 70% code coverage
5. Use `npm run test:coverage` to see coverage report
