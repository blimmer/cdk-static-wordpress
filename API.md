# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### WordpressServerless <a name="WordpressServerless" id="cdk-wordpress-serverless.WordpressServerless"></a>

#### Initializers <a name="Initializers" id="cdk-wordpress-serverless.WordpressServerless.Initializer"></a>

```typescript
import { WordpressServerless } from 'cdk-wordpress-serverless'

new WordpressServerless(scope: Construct, id: string, props: IWordpressServerlessProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps">IWordpressServerlessProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-wordpress-serverless.WordpressServerless.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-wordpress-serverless.IWordpressServerlessProps">IWordpressServerlessProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-wordpress-serverless.WordpressServerless.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-wordpress-serverless.WordpressServerless.isConstruct"></a>

```typescript
import { WordpressServerless } from 'cdk-wordpress-serverless'

WordpressServerless.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-wordpress-serverless.WordpressServerless.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-wordpress-serverless.WordpressServerless.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-wordpress-serverless.WordpressServerless.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IWordpressServerlessProps <a name="IWordpressServerlessProps" id="cdk-wordpress-serverless.IWordpressServerlessProps"></a>

- *Implemented By:* <a href="#cdk-wordpress-serverless.IWordpressServerlessProps">IWordpressServerlessProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.containerMemory">containerMemory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.wordpressDockerImageBase">wordpressDockerImageBase</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.wp2StaticS3AddonVersion">wp2StaticS3AddonVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-wordpress-serverless.IWordpressServerlessProps.property.wp2StaticVersion">wp2StaticVersion</a></code> | <code>string</code> | *No description.* |

---

##### `containerMemory`<sup>Optional</sup> <a name="containerMemory" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.containerMemory"></a>

```typescript
public readonly containerMemory: string;
```

- *Type:* string
- *Default:* 256M

---

##### `wordpressDockerImageBase`<sup>Optional</sup> <a name="wordpressDockerImageBase" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.wordpressDockerImageBase"></a>

```typescript
public readonly wordpressDockerImageBase: string;
```

- *Type:* string
- *Default:* wordpress:php7.4-apache

---

##### `wp2StaticS3AddonVersion`<sup>Optional</sup> <a name="wp2StaticS3AddonVersion" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.wp2StaticS3AddonVersion"></a>

```typescript
public readonly wp2StaticS3AddonVersion: string;
```

- *Type:* string
- *Default:* 1.0

---

##### `wp2StaticVersion`<sup>Optional</sup> <a name="wp2StaticVersion" id="cdk-wordpress-serverless.IWordpressServerlessProps.property.wp2StaticVersion"></a>

```typescript
public readonly wp2StaticVersion: string;
```

- *Type:* string
- *Default:* 7.1.7

---

