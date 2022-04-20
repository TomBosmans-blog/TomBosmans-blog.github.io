import{_ as n,c as s,o as a,a as e}from"./app.ead78b55.js";const d='{"title":"Executable module","description":"","frontmatter":{"sidebar":false},"headers":[],"relativePath":"articles/2020-01-12-executable-module.md","lastUpdated":null}',p={},t=e(`<h1 id="executable-module" tabindex="-1">Executable module <a class="header-anchor" href="#executable-module" aria-hidden="true">#</a></h1><p>Small classes that only do 1 thing are the best. They are easier to read, easier to test and overall less headaches \u{1F44C}. These small classes usually only have 1 public method that I like to call <code>execute</code>, although <code>call</code> is also a popular name for it. These classes usually look like:</p><div class="language-rb line-numbers-mode"><pre><code><span class="token keyword">class</span> <span class="token class-name">Multiplier</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>param1<span class="token punctuation">,</span> param2<span class="token punctuation">)</span>
    <span class="token variable">@param1</span> <span class="token operator">=</span> param1
    <span class="token variable">@param2</span> <span class="token operator">=</span> param2
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">execute</span></span>
    param1 <span class="token operator">*</span> param2
  <span class="token keyword">end</span>

  <span class="token keyword">private</span>

  attr_reader <span class="token symbol">:param1</span><span class="token punctuation">,</span> <span class="token symbol">:param2</span>
<span class="token keyword">end</span>

<span class="token class-name">Multiplier</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">.</span>execute <span class="token comment"># =&gt; 30</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>So you usually initialize to instantly execute/call your instance. As we are very lazy people, we want to shorten this!</p><div class="language-rb line-numbers-mode"><pre><code><span class="token keyword">class</span> <span class="token class-name">Multiplier</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>param1<span class="token punctuation">,</span> param2<span class="token punctuation">)</span>
    <span class="token variable">@param1</span> <span class="token operator">=</span> param1
    <span class="token variable">@param2</span> <span class="token operator">=</span> param2
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">execute</span></span>
    param1 <span class="token operator">*</span> param2
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">execute</span></span><span class="token punctuation">(</span>param1<span class="token punctuation">,</span> param2<span class="token punctuation">)</span>
    <span class="token keyword">new</span><span class="token punctuation">(</span>param1<span class="token punctuation">,</span> param2<span class="token punctuation">)</span><span class="token punctuation">.</span>execute
  <span class="token keyword">end</span>

  <span class="token keyword">private</span>

  attr_reader <span class="token symbol">:param1</span><span class="token punctuation">,</span> <span class="token symbol">:param2</span>
<span class="token keyword">end</span>

Multiplier<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token comment"># =&gt; 30</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>Perfect! Except now we have to write a class method for every such class we make... What about extracting it into a reusable module? But not every class we want to execute will have an <code>param1</code> and a <code>param2</code>, so we need to fix that first.</p><div class="language-rb line-numbers-mode"><pre><code><span class="token keyword">def</span> <span class="token method-definition"><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">execute</span></span><span class="token punctuation">(</span><span class="token operator">*</span>params<span class="token punctuation">)</span>
  <span class="token keyword">new</span><span class="token punctuation">(</span><span class="token operator">*</span>params<span class="token punctuation">)</span><span class="token punctuation">.</span>execute
<span class="token keyword">end</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>For more info about <code>*</code>, the splat operator, you should check the ruby docs <a href="https://ruby-doc.org/core-2.5.0/doc/syntax/calling_methods_rdoc.html#label-Array+to+Arguments+Conversion" target="_blank" rel="noopener noreferrer">here</a>.</p><p>So how will this look with a module?</p><div class="language-rb line-numbers-mode"><pre><code><span class="token keyword">module</span> <span class="token class-name">Executable</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">execute</span></span><span class="token punctuation">(</span><span class="token operator">*</span>params<span class="token punctuation">)</span>
    <span class="token keyword">new</span><span class="token punctuation">(</span><span class="token operator">*</span>params<span class="token punctuation">)</span><span class="token punctuation">.</span>execute
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

<span class="token keyword">class</span> <span class="token class-name">Multiplier</span>
  <span class="token keyword">extend</span> Executable

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>param1<span class="token punctuation">,</span> param2<span class="token punctuation">)</span>
    <span class="token variable">@param1</span> <span class="token operator">=</span> param1
    <span class="token variable">@param2</span> <span class="token operator">=</span> param2
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">execute</span></span>
    param1 <span class="token operator">*</span> param2
  <span class="token keyword">end</span>

  <span class="token keyword">private</span>

  attr_reader <span class="token symbol">:param1</span><span class="token punctuation">,</span> <span class="token symbol">:param2</span>
<span class="token keyword">end</span>

Multiplier<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token comment"># =&gt; 30</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>By extending our <code>Executable</code> module in our <code>Multiplier</code> class we add the <code>execute</code> method on the <code>Multiplier</code> class level (same as <code>self.execute</code>).</p><p>Finally there is 1 more thing we could consider and that is <a href="https://ruby-doc.org/core-2.5.0/doc/syntax/calling_methods_rdoc.html#label-Block+Argument" target="_blank" rel="noopener noreferrer">blocks</a>. In our initializer we don&#39;t want to do anything more than initializing, so we should pass the given block to our execute method as that is where we actually execute our logic.</p><div class="language-rb line-numbers-mode"><pre><code><span class="token keyword">module</span> <span class="token class-name">Executable</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">execute</span></span><span class="token punctuation">(</span><span class="token operator">*</span>params<span class="token punctuation">,</span> <span class="token operator">&amp;</span>block<span class="token punctuation">)</span>
    <span class="token keyword">new</span><span class="token punctuation">(</span><span class="token operator">*</span>params<span class="token punctuation">)</span><span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token operator">&amp;</span>block<span class="token punctuation">)</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

<span class="token keyword">class</span> <span class="token class-name">Multiplier</span>
  <span class="token keyword">extend</span> Executable

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>param1<span class="token punctuation">,</span> param2<span class="token punctuation">)</span>
    <span class="token variable">@param1</span> <span class="token operator">=</span> param1
    <span class="token variable">@param2</span> <span class="token operator">=</span> param2
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">execute</span></span>
    result <span class="token operator">=</span> param1 <span class="token operator">*</span> param2
    result <span class="token operator">=</span> <span class="token keyword">yield</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token keyword">if</span> block_given<span class="token operator">?</span>
    result
  <span class="token keyword">end</span>

  <span class="token keyword">private</span>

  attr_reader <span class="token symbol">:param1</span><span class="token punctuation">,</span> <span class="token symbol">:param2</span>
<span class="token keyword">end</span>

Multiplier<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>result<span class="token operator">|</span> result <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span> <span class="token comment"># =&gt; 31</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>In this case you could just have done <code>Multiplier.execute(5, 6) + 1</code> or even just <code>5 * 6 + 1</code>. But hey, this is way cooler isn&#39;t it? \u{1F60E}.</p>`,14),l=[t];function o(c,r,u,i,k,b){return a(),s("div",null,l)}var y=n(p,[["render",o]]);export{d as __pageData,y as default};
